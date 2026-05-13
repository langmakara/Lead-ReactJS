import { Box } from "@chakra-ui/react"
import UserInfo from "../components/userInfo";
import EditProfileInfo from "../components/EditProfileInfo";



const Profile = () => {
    return (
        <Box h={"100vh"}>
            <UserInfo />
            <EditProfileInfo />
        </Box>
    )
}

export default Profile
