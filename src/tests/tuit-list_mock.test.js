import {Tuits} from "../components/tuits/index";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";
import {UserList} from "../components/profile/user-list";

jest.mock('axios');

const MOCKED_USERS = [
    {username: "alice", password: "wonderland", email: "alice@wonderland.com", _id: "567"},
    {username: "bob", password: "rasta", email: "bob@reggae.com", _id: "890"},
    {username: "charlie", password: "peanuts", email: "charlie@peanuts.com", _id: "012"}
];

const MOCKED_TUITS = [
    {tuit: "alice's tuit", postedBy: {
            username: "alice",
            password: "wonderland",
            email: "alice@wonderland.com",
            _id: "567"}},
    {tuit: "bob's tuit", postedBy: {
            username: "bob",
            password: "rasta",
            email: "bob@reggae.com",
            _id: "890"}},
    {tuit: "charlie's tuit", postedBy: {
            username: "charlie",
            password: "peanuts",
            email: "charlie@peanuts.com",
            _id: "012"}}
];

/*let i;
for(i = 0; i < MOCKED_USERS.length; i++) {
    MOCKED_TUITS[i].postedBy = MOCKED_USERS[i];
};*/


test('tuit list renders mocked', async () => {
    // TODO: implement this
    axios.get.mockImplementation(() =>
        Promise.resolve({data: {tuits: MOCKED_TUITS} }));
    const response = await findAllTuits();
    const tuits = response.tuits;

    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);

    const tuit = screen.getByText(/alice's tuit/i);
    expect(tuit).toBeInTheDocument();
});
