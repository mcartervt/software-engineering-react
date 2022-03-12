import {
  deleteTuit,
  findTuitById, findAllTuits, 
  createTuit
} from "../services/tuits-service";

import {
  createUser, deleteUser, deleteUsersByUsername
} from "../services/users-service";


describe('can create tuit with REST API', () => {
  // Sample user to create the tuit
  const schroeder = {
    username: 'Schroeder',
    password: 'beethoven',
    email: 'schroeder@peanuts.com'
  }
  const schroederTuit = {
    _id: "62164ad74f3b3f002d493ed8",
    tuit: "Beethoven is the best!",
    postedBy: ""
  }

  let newTuit = '';
  let newUser = '';
  
  // Setup test before running test
  beforeAll(async () => {
    //Create user for test
    newUser = await createUser(schroeder);
    schroederTuit.postedBy = newUser._id;
    // Remove any tuit by the id
    return deleteTuit(schroederTuit._id);
  });

  // Clean up after test runs
  afterAll(() => {
    // Remove any data we created
    deleteUsersByUsername(newUser.username)
    return deleteTuit(newTuit._id);
  })

  test('Can insert new tuits with REST API', async () => {
    // Insert new tuit in the database
    newTuit = await createTuit(schroederTuit.postedBy, schroederTuit);

    // Verify inserted tuit's properties match parameter of tuit
    expect(newTuit.tuit).toEqual(schroederTuit.tuit);
    expect(newTuit.postedBy).toEqual(schroederTuit.postedBy);
  });
});

describe('can delete tuit wtih REST API', () => {
  // Sample tuit to delete
  const sallyTuit = {
    tuit: "Hark!  Hark!  Hockey stick!",
    postedBy: ""
  }
  // Sample user to create the tuit
  const sally = {
    username: 'Sally Brown',
    password: 'sister',
    email: 'sally.brown@peanuts.com'
  }

  let newTuit = '';
  let newUser = '';

  // Setup the tests before verification
  beforeAll(async () => {
    // Make demo user
    newUser = await createUser(sally);
    sallyTuit.postedBy = newUser._id;
    // Insert the sample tuit we then try to remove
    newTuit = await createTuit(newUser._id, sallyTuit);
    //return newTuit; 
  });

  afterAll(() => {
    // Remove any data we created
    deleteUsersByUsername(newUser.username)
    return deleteTuit(newTuit._id);
  })

  test('Can delete tuits from REST API', async () => {
    // Delete a tuit by the id
    const status = await deleteTuit(newTuit._id);

    // Verify we deleted at least one tuit by its id
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // Sample tuit to retrieve
  const snoopyTuit = {
    tuit: "Feed me! It's supper time.",
    postedBy: ""
  }
  // Sample user to create the tuit
  const snoopy = {
    username: 'Snoopy',
    password: 'joecool',
    email: 'snoopy@peanuts.com'
  }

  let newTuit = '';
  let newUser = '';

  // Setup the tests before verification
  beforeAll(async () => {
    // Make demo user
    newUser = await createUser(snoopy);
    snoopyTuit.postedBy = newUser._id;
    // Insert the sample tuit we then try to retrieve
    newTuit = await createTuit(newUser._id, snoopyTuit);
    //return newTuit; 
  });

  afterAll(() => {
    // Remove any data we created
    deleteUsersByUsername(newUser.username);
    return deleteTuit(newTuit._id);
  })

  test('can retrieve a tuit by their primary key with REST API', async () => {
    // Verify newTuit matches parameter tuit
    expect(newTuit.tuit).toEqual(snoopyTuit.tuit);
    expect(newTuit.postedBy).toEqual(snoopyTuit.postedBy);

    // Retrieve a tuit by its id
    const foundTuit = await findTuitById(newTuit._id);
    // Verify we retrieved a tuit by its id
    expect(foundTuit.tuit).toEqual(snoopyTuit.tuit);
    expect(foundTuit.postedBy._id).toEqual(snoopyTuit.postedBy);
  });
});

describe('can retrieve all tuits with REST API', () => {
  // Sample tuits to retrieve
  const spongebobTuit1 = {
    tuit: "I'm ready!",
    postedBy: ""
  }
  const spongebobTuit2 = {
    tuit: "Patrick's my best friend!",
    postedBy: ""
  }
  const patrickTuit1 = {
    tuit: "My mind is an enigma.",
    postedBy: ""
  }
  // Sample users to create the tuits
  const spongebob = {
    username: 'Spongebob Squarepants',
    password: 'spatula',
    email: 'spongebob@nick.com'
  }
  const patrick = {
    username: 'Patrick Star',
    password: 'rock',
    email: 'patrick@nick.com'
  }

  let newTuit1 = '';
  let newTuit2 = '';
  let newTuit3 = '';

  let newUser1 = '';
  let newUser2 = '';

  // Setup the tests before verification
  beforeAll(async () => {
    // Make demo users
    newUser1 = await createUser(spongebob);
    //newUser2 = await createUser(patrick);

    spongebobTuit1.postedBy = newUser1._id;
    spongebobTuit2.postedBy = newUser1._id;
    //patrickTuit1.postedBy = newUser2._id;
    // Insert the sample tuits we then try to retrieve
    newTuit1 = await createTuit(newUser1._id, spongebobTuit1);
    newTuit2 = await createTuit(newUser1._id, spongebobTuit2);
    //newTuit3 = await createTuit(newUser2._id, patrickTuit1);
    //return newTuit; 
  });

  afterAll(() => {
    // Remove any data we created
    deleteUsersByUsername(newUser1.username);
    //deleteUsersByUsername(newUser2.username);
    deleteTuit(newTuit1._id);
    deleteTuit(newTuit2._id);
    //return deleteTuit(newTuit3._id);
  })

  test('can retrieve a tuit by their primary key with REST API', async () => {
    // Verify newTuits matches parameter tuits
    expect(newTuit1.tuit).toEqual(spongebobTuit1.tuit);
    expect(newTuit1.postedBy).toEqual(spongebobTuit1.postedBy);

    expect(newTuit2.tuit).toEqual(spongebobTuit2.tuit);
    expect(newTuit2.postedBy).toEqual(spongebobTuit2.postedBy);

    //expect(newTuit3.tuit).toEqual(patrickTuit1.tuit);
    //expect(newTuit3.postedBy).toEqual(patrickTuit1.postedBy);

    // Retrieve all tuits
    const foundTuits = await findAllTuits();
    // Verify we retrieved a tuit by its id
    const numTuits = foundTuits.length;
    expect(numTuits).toBeGreaterThanOrEqual(2);

    const tuitIds = [];
    let i = 0;
    for(i = 0; i < numTuits; i++) {
      tuitIds.push(foundTuits[i]._id);
    }
    let containsIds = false;
    if (tuitIds.includes(newTuit1._id) && tuitIds.includes(newTuit2._id)) {
      containsIds = true;
    }
    expect(containsIds).toBe(true);
  });
});