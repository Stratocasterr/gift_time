// this function is to convert list of presents names into object
export default function new_presents_list(user_presents,new_present)
{
    let id = 0
    let new_presents = {}
    for(let i=0;i<user_presents.length;i++)
    {
        new_presents[id] = user_presents[i]
        id++
    }
    if(new_present) new_presents[id] = new_present
    return new_presents
}
