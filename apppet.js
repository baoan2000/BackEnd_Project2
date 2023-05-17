const url2 = "http://localhost:3000/products";
let datapets=[];
const petfood= document.getElementById("petfood");
ShowDataPet();
loadScript('lib/owlcarousel/owl.carousel.min.js');
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
    return data
}

async function ShowDataPet()
{
    datapets = await axiosprocess(url2,"get","","");
    let datapetsarray= Array.from(datapets);
    let xhtml='';
    datapetsarray.forEach((item)=>{
        xhtml+=
        `<div class="pb-5">
            <div class="product-item position-relative bg-light d-flex flex-column text-center">
                <img class="img-fluid mb-4" src="${item.img}" alt="">
                <h6 class="text-uppercase">${item.title}</h6>
                <h5 class="text-primary mb-0">$${item.price}</h5>
                <div class="btn-action d-flex justify-content-center">
                    <a class="btn btn-primary py-2 px-3" href=""><i class="bi bi-cart"></i></a>
                    <a class="btn btn-primary py-2 px-3" href=""><i class="bi bi-eye"></i></a>
                </div>
            </div>
        </div>`;
    })
    petfood.innerHTML=xhtml;
    console.log(petfood.innerHTML);

    console.log(datapetsarray);
}
function loadScript(url)
{    
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}