import { Typography } from '@mui/material'
import { Container } from '@mui/system'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import urlcat from 'urlcat'
import UserDetailsContext from '../components/contextStore/userdetails-context'
import ProfileForm from '../components/ProfileForm'
import { IUserDetails2 } from '../Interface'

const Profile = () => {

    const [refresh, setRefresh] = useState(false)
    const [userDetails, setUserDetails] = useState<IUserDetails2>({
        date_of_birth: '',
        email: '',
        gender: '',
        id: 0,
        legacy_allocation: 0,
        life_expectancy: 0,
        name: '',
        retirement_age: 0,
        retirement_lifestyle: '',
        updated_at: '',
        created_at: '',
    });

    const SERVER = import.meta.env.VITE_SERVER;
    const token = sessionStorage.getItem('token')
    const userContext = useContext(UserDetailsContext)

    const userUrl = urlcat(SERVER, `/users/${userContext.id}`);
    const header = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    useEffect(() => {
        axios
            .get(userUrl, header)
            .then((res) => {
                setUserDetails(res.data)
            })
            .catch((error) => console.log(error.response.data.error));

    }, [refresh])




    const update = () => {
        setRefresh(!refresh)
    }



    return (
        <Container maxWidth='lg'>
            <Typography variant='h3' sx={{ mb: '3rem', color: '#53565B', fontWeight: '700' }}>Profile</Typography>
            <ProfileForm userDetails={userDetails} update={update} />
        </Container>
    )
}

export default Profile