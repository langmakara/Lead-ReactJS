import { Box } from "@chakra-ui/react"
import UserInfo from "../components/userInfo";
import EditProfileInfo from "../components/EditProfileInfo";



const Profile = () => {
    return (
        <Box>
            <UserInfo />
            <EditProfileInfo />
        </Box>
    )
}

export default Profile
