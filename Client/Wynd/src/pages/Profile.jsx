import { UserContext } from "../Context/UserContext";
import { useContext } from "react";

function Profile(){
    const { user } = useContext(UserContext)
}