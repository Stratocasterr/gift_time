export default function new_presents_list(user_presents,new_present)
{
    console.log(user_presents)
    console.log(new_present)
    let id = 0
    let new_presents = {}
    for(let i=0;i<user_presents.length;i++)
    {
        new_presents[id] = user_presents[i]
        id++
    }
    console.log("bifor",new_presents)
    if(new_present) new_presents[id] = new_present
    console.log("last", new_presents)
    return new_presents
}


