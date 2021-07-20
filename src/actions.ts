import { Api } from 'eosjs'
import { User } from './'

const get = async (api: Api) => {
  return api.transact({
    actions: [{
      account: 'readonly',
      name: 'get',
      authorization: [{
        actor: 'readonly',
        permission: 'active',
      }],
      data: {}
    }]
  }, {
    useLastIrreversible: true,
    expireSeconds: 30,
    readOnlyTrx: true,
    returnFailureTraces: true,
  }) as any
}

const put = async (api: Api, user: User) => {
  return api.transact({
    actions: [{
      account: 'readonly',
      name: 'put',
      authorization: [{
        actor: 'readonly',
        permission: 'active',
      }],
      data: user
    }]
  }, {
    useLastIrreversible: true,
    expireSeconds: 30
  }) as any
}

export default {
  get,
  put,
}