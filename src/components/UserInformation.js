import React from "react"


const UserInformation = ({userInformation}) => {
    const user  = userInformation.user
    const roles = userInformation.roles

    const mapRoles = (roles) => {

        const roleListElements = roles.map((role) =>
            <li key={role.id} >{role.abreviation} ({role.description})</li>
        )

        return <ul>{roleListElements}</ul>
    }


    //renders only if there is userinformation
    if (userInformation) {
        return (
            <div>
                Email: {user.email}
                <hr />
                Hallo {user.frontName} {user.lastName},
                <br />

                je rollen zijn
                {roles ? mapRoles(roles) : " loading"}
            </div>
        )
    }

    //default return
    return (
        <div>Loading....</div>
    )
}

export default UserInformation