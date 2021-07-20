import React, { useState } from 'react'
import { Modal } from 'semantic-ui-react'

import { User } from '..'

interface NewUserProps {
  nextId: number;
  put: (user: User) => Promise<void>;
}

interface UserType {
  name: string;
  state: string;
  age: number|'';
}

export const NewUserModal: React.FC<NewUserProps> = ({ put, nextId }: NewUserProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [user, setUser] = useState<UserType>({ name: '', state: '', age: '' })
  const [error, setError] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    if (!e.target.value) return setUser({ ...user, [e.target.name]: '' })
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const putUser = async () => {
    if (user.name === '') return setError('Name can not be blank')
    if (user.state === '') return setError('State can not be blank')
    if (user.age === '') return setError('Age can not be blank')
    await put({ ...user, id: nextId })
    setOpen(false)
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<button id='newUserBtn' className='ui black button'>New User</button>}
    >
      <Modal.Header>Create a New User</Modal.Header>
      <Modal.Content>
        <form className="ui form error">
          <div className="field">
            <label>Name</label>
            <div className="one field">
              <div className="field">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={user.name}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="two fields">
            <div className="field">
              <label>State</label>
              <select
                className="ui fluid dropdown"
                name="state"
                value={user.state}
                onChange={handleChange}
              >
                <option value="">State</option>
                <option value="Alabama">Alabama</option>
                <option value="Alaska">Alaska</option>
                <option value="Arizona">Arizona</option>
                <option value="Arkansas">Arkansas</option>
                <option value="California">California</option>
                <option value="Colorado">Colorado</option>
                <option value="Connecticut">Connecticut</option>
                <option value="Delaware">Delaware</option>
                <option value="District Of Columbia">District Of Columbia</option>
                <option value="Florida">Florida</option>
                <option value="Georgia">Georgia</option>
                <option value="Hawaii">Hawaii</option>
                <option value="Idaho">Idaho</option>
                <option value="Illinois">Illinois</option>
                <option value="Indiana">Indiana</option>
                <option value="Iowa">Iowa</option>
                <option value="Kansas">Kansas</option>
                <option value="Kentucky">Kentucky</option>
                <option value="Louisiana">Louisiana</option>
                <option value="Maine">Maine</option>
                <option value="Maryland">Maryland</option>
                <option value="Massachusetts">Massachusetts</option>
                <option value="Michigan">Michigan</option>
                <option value="Minnesota">Minnesota</option>
                <option value="Mississippi">Mississippi</option>
                <option value="Missouri">Missouri</option>
                <option value="Montana">Montana</option>
                <option value="Nebraska">Nebraska</option>
                <option value="Nevada">Nevada</option>
                <option value="New Hampshire">New Hampshire</option>
                <option value="New Jersey">New Jersey</option>
                <option value="New Mexico">New Mexico</option>
                <option value="New York">New York</option>
                <option value="North Carolina">North Carolina</option>
                <option value="North Dakota">North Dakota</option>
                <option value="Ohio">Ohio</option>
                <option value="Oklahoma">Oklahoma</option>
                <option value="Oregon">Oregon</option>
                <option value="Pennsylvania">Pennsylvania</option>
                <option value="Rhode Island">Rhode Island</option>
                <option value="South Carolina">South Carolina</option>
                <option value="South Dakota">South Dakota</option>
                <option value="Tennessee">Tennessee</option>
                <option value="Texas">Texas</option>
                <option value="Utah">Utah</option>
                <option value="Vermont">Vermont</option>
                <option value="Virginia">Virginia</option>
                <option value="Washington">Washington</option>
                <option value="West Virginia">West Virginia</option>
                <option value="Wisconsin">Wisconsin</option>
                <option value="Wyoming">Wyoming</option>
              </select>
            </div>
            <div className="field">
              <label>Age</label>
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={user.age}
                onChange={handleChange}
              />
            </div>
          </div>
          {error && error !== '' && <div className="ui error message">
            <div className="header">Form Error</div>
            <p>{error}</p>
          </div>}
        </form>
      </Modal.Content>
      <Modal.Actions>
        <button id='cancelBtn' className='ui red button' onClick={() => setOpen(false)}>Cancel</button>
        <button id='submitBtn' className='ui green button' onClick={() => putUser()}>Create User</button>
      </Modal.Actions>
    </Modal>
  )
}
