// CRUD
const url = " http://localhost:3000/students";

let datastudents=[];

let currentid=0;
const name_element= document.getElementById("name");
const age_element = document.getElementById("age");
const submit_element = document.getElementById("sub");
const student = document.getElementById("student");
ShowData();

async function axiosprocess(url,method,id,datareceived)
{
    let urlaxios=url;   
    if (id!=="") urlaxios+=`/${id}`;
    let config={
        method:method,
        url:urlaxios
    }
    if(datareceived!=="") config.data=datareceived;
    console.log(config);
    const res = await axios(config)
    const data=res.data;
    currentid=0;name_element.value="";age_element.value="";
    return data
}

async function ShowData()
{
    datastudents= await axiosprocess(url,"get","","");
    let xhtml= '';
    let datastudentsarray = Array.from(datastudents);
    datastudentsarray.forEach(item => {
        xhtml+= /*html*/`<h2>${item.name}</h2>
                        <p>${item.age}</p>
                        <button onCLick="handleDelete(${item.id})">Xóa</button>
                        <button onCLick="handleEdit(${item.id})">Chỉnh sửa</button>`
    });
    student.innerHTML=xhtml;
}
async function handleDelete(id){
    await axiosprocess(url,"delete",id,"");
    ShowData();
}
function handleEdit(id){
    currentid=id;
    const find= datastudents.find((item)=>{
        return item.id===id
    });
    if(find) {
        name_element.value=find.name;
        age_element.value=find.age;
    }
}
submit_element.addEventListener("click",async ()=>{
    const data_update={
        name:name_element.value,
        age: age_element.value
    }
    if(currentid!==0)
        await axiosprocess(url,"put",currentid,data_update);
    else await axiosprocess(url,"post","",data_update)
    ShowData();
})
