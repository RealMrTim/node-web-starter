/**
 * Example of a module shared between server and client.
 * 
 */
class Shared {
    
    private _version : string = "1.0";

    print () {
        console.log("My shared lib version", this._version);
    }
}

export default Shared;