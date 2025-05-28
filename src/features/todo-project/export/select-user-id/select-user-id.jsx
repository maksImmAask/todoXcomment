import { Select } from '@mantine/core'
import { useEffect, useState } from 'react'

export const SelectUsers = (props) => {
  const [users, setUseres] = useState([])

  const fetchUsers = () => {
    fetch('https://dummyjson.com/users')
      .then((res) => res.json())
      .then((data) => setUseres(data.users))
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const filterSelectedData = users.map((user) => ({
    value: user.id.toString(),
    label: user.username,
  }))

  return <Select data={filterSelectedData} {...props} />
}
