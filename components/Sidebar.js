import styled from 'styled-components';
import { Avatar, IconButton, Button } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';


const Sidebar = () => {
    return (
        <Container>
            <Header>
                <UserAvater />
                <IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </IconsContainer>
            </Header>

            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search in Chat"/>
            </Search>

            <SidebarButton>Start a new chat</SidebarButton>

            {/* chat componenets */}

        </Container>
    )
}

export default Sidebar;

const Container = styled.div`
`;

const Header = styled.div`
    display: flex;
    justify-Content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;

const UserAvater = styled(Avatar)`
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }
`;

const IconsContainer = styled.div``;

const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
`;

const SearchInput = styled.input`
    outline-width: 0;
    border: none;
    flex: 1;
`;

const SidebarButton = styled(Button)`
    width: 100%;

    &&& {
        border-top: 1px solid whiteSmoke;
        border-bottom: 1px solid whiteSmoke;
    }
`;

