/**
 * @file Loops through an array of tuits and
 *       creates Tuit objects with an id and
 *       the provided text.
 */

import Tuit from "./tuit";

const Tuits = ({tuits = []}) => {
    return (
        <div>
            {
                tuits.map(tuit =>
                    <Tuit
                        key={tuit._id}
                        tuit={tuit}
                    />
                )
            }
        </div>
    )
}
export default Tuits;