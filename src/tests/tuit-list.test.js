import Tuits from "../components/tuits/index";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import "@testing-library/jest-dom";
import {UserList} from "../components/profile/user-list";


const MOCKED_USERS = [
    {username: "alice", password: "wonderland", email: "alice@wonderland.com", _id: "997"},
    {username: "bob", password: "rasta", email: "bob@reggae.com", _id: "998"},
    {username: "charlie", password: "peanuts", email: "charlie@peanuts.com", _id: "999"}
];

const MOCKED_TUITS = [
    {tuit: "alice's tuit", postedBy: ""},
    {tuit: "bob's tuit", postedBy: ""},
    {tuit: "charlie's tuit", postedBy: ""}
];

let i;
for(i = 0; i < MOCKED_USERS.length; i++) {
    MOCKED_TUITS[i].postedBy = MOCKED_USERS[i];
};

test('tuit list renders static tuit array', () => {
    // 'Insert' mocked users first
    render(
        <HashRouter>
            <UserList users={MOCKED_USERS}/>
        </HashRouter>);
    // Then 'insert' mocked tuits
    render(
        <HashRouter>
            <Tuits tuits={MOCKED_TUITS}/>
        </HashRouter>);
    const linkElement = screen.getByText(/alice's tuit/i);
    expect(linkElement).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  const tuits = await findAllTuits();
  render(
      <HashRouter>
          <Tuits tuits={tuits}/>
      </HashRouter>);
  const linkElement = screen.getByText(
      /In 2021, our @NASAPersevere Mars rover landed and our Ingenuity helicopter took flight. Two asteroid missions launched to the skies, and another began its journey home to Earth./i);
  expect(linkElement).toBeInTheDocument();
})