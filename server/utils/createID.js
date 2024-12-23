const createID = async (ojb_name)=>{
    const date = new Date(Date.now()).getFullYear();
    const extractCapital = await ojb_name.match(/[A-Z]/g);
    const joinedCapital = extractCapital ? extractCapital.join(" ") : ""; 

    const obj_id = (date.toString(10) + joinedCapital +  Math.floor(Math.random()*900).toString(10));
    return obj_id;
}

export default createID;