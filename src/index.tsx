// To see this in action, run this in a terminal:
//      gp preview $(gp url 8000)

import React, { useState, useEffect } from 'react'
import * as ReactDOM from 'react-dom'
import { Api, JsonRpc } from 'eosjs'
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'

import 'semantic-ui-css/semantic.min.css'
import './styles.css'

import { NewUserModal } from './NewUserModal'
import { UserComponent } from './User'
import { Error } from './Error'

import actions from './actions'

const rpc = new JsonRpc('')
const privateKey = '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'

export interface User {
  id: number,
  name: string,
  state: string,
  age: number|'',
}

const App: React.FC = () => {
  const [api] = useState<Api>(new Api({ rpc, signatureProvider: new JsSignatureProvider([privateKey]) }))
  const [error, setError] = useState<string>('')
  const [list, setList] = useState<any>()
  const [nextId, setNextId] = useState<number>(0)

  useEffect(() => {
    getList() // eslint-disable-line @typescript-eslint/no-floating-promises
  }, [])

  const getList = async () => {
    setError('')
    if (api === undefined) return setError('Unexpected error: Api object is not set.')

    try {
      const transactionResult = await actions.get(api)
      const entries = transactionResult.result.action_traces[0].return_value_data
        .sort((a: User, b: User) => a.id - b.id)
      if (entries.length !== 0) setNextId(entries[entries.length-1].id+1)
      setList(entries)
    } catch (e) {
      setError(e.message)
    }
  }

  const put = async (user: User) => {
    setError('')
    if (api === undefined) return setError('Unexpected error: Api object is not set.')

    try {
      await actions.put(api, user)
      await getList()
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className='ui container'>
      <h1 className='ui header centered'>Read Only Example App</h1>
      <div className='ui fluid container right aligned'>
        <NewUserModal nextId={nextId} put={put} />
      </div>
      <div id="list" className="ui raised segment center aligned">
        {list && <table className="ui celled table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {list.map((user: User) => <UserComponent key={user.id} user={user} />)}
          </tbody>
        </table>}
        {(!list || list.length === 0) && <div>No Users To Display, Create A New User!</div>}
      </div>
      {error && <Error error={error} />}
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('example')
)
