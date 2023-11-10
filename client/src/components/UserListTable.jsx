import { useEffect, useState } from 'react';

import * as userService from '../services/userService';

import UserListItem from "./UserListItem.jsx";
import Spinner from './Spinner.jsx';
import UserCreateModal from './UserCreateModal.jsx';
import UserInfoModal from './UserInfoModal.jsx'

const UserListTable = () => {
    const [users, setUsers] = useState([]);

    const [isLoading, setIsLoading] = useState(false);  // for Spiner

    const [showInfo, setShowInfo] = useState(false);    // for modal
    const [showCreate, setShowCreate] = useState(false);  
    const [showDelete, setShowDelete] = useState(false);


    const [selectedUser, setSelectedUser] = useState(null);


    useEffect(() => {

        setIsLoading(true);

        userService.getAll()
            .then(result => setUsers(result))     // then(setUsers)
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    }, []);

    const createUserClickHandler = () => {
        setShowCreate(true);        
    };

    const userCreateHandler = async (e) => {
        // закачен за формата в модала за onSubmit react eventa, да не се скрива модала
        // Stop page refreshing
        e.preventDefault();


        console.log('user creating from Form');
        //const formData=new FormData(e.currentTarget);
        //console.log (formData.get('firstName'));   // from form name= "firstName"
        //const{firstName}=Object.fromEntries(formData); 
        //деконструираме object взимаме стойн в firstName на name= "firstName" ot form
        //console.log(firstName);
        console.log(e);
        console.log(e.currentTarget);

        // Get data from form data
        //извличаме данните от формата в plan object
        const data = Object.fromEntries(new FormData(e.currentTarget));  //plain object ot name:value from form include is that not entred

        console.log(data);

        // Create new user at the server
        const newUser = await userService.create(data);



        // Add newly created user to the local state
        setUsers(state => [...state, newUser]);


        // Close the modal
        setShowCreate(false);

    };



    const hideUserCreateModal = () => {
        setShowCreate(false);
    }

    const userInfoClickHandler = async (userId) => {
        setSelectedUser(userId);
        setShowInfo(true);
    };

    const userDeleteClickHandler = (userId) => {
        setSelectedUser(userId);
        setShowDelete(true);
    };



    return (


        <div className="table-wrapper">

            {isLoading && <Spinner />}

            {showCreate && (
                <UserCreateModal 
                    onClose={hideUserCreateModal}
                    onCreate={userCreateHandler}
                />
            )}

            {showInfo && 
                <UserInfoModal
                    onClose={() => setShowInfo(false)}
                    userId={selectedUser}
            />}



            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Image
                        </th>
                        <th>
                            First name<svg aria-hidden="true" focusable="false" data-prefix="fas"
                                data-icon="arrow-down" className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <path fill="currentColor"
                                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                </path>
                            </svg>
                        </th>
                        <th>
                            Last name<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512">
                                <path fill="currentColor"
                                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                </path>
                            </svg>
                        </th>
                        <th>
                            Email<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512">
                                <path fill="currentColor"
                                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                </path>
                            </svg>
                        </th>
                        <th>
                            Phone<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512">
                                <path fill="currentColor"
                                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                </path>
                            </svg>
                        </th>
                        <th>
                            Created
                            <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                data-icon="arrow-down" className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <path fill="currentColor"
                                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                </path>
                            </svg>
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <UserListItem
                            key={user._id}
                            userId={user._id}
                            createdAt={user.createdAt}
                            email={user.email}
                            firstName={user.firstName}
                            imageUrl={user.imageUrl}
                            lastName={user.lastName}
                            phoneNumber={user.phoneNumber}
                            onInfoClick={userInfoClickHandler}
                            onDeleteClick={userDeleteClickHandler}
                        />
                    ))}
                </tbody>
            </table>

            <button className="btn-add btn" onClick={createUserClickHandler}>Add new user</button>



        </div>
    );

};

export default UserListTable;
