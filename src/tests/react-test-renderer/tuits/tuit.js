/**
 * @file Tuit provides a tuit object that can be used for testing
 * @param tuit The tuit text to be used
 * @returns {JSX.Element} The tuit object
 */

const Tuit = ({tuit}) => {
    return(
        <li className="ttr-tuit">
            {tuit.tuit}
        </li>
    )
}
export default Tuit