const result = document.getElementById("result");
const buy = document.getElementById("buy");
const test = document.getElementById("test");

document.getElementById("gen").onclick = async ()=>{

const res = await fetch("/api/generate",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
name:name.value,
country:country.value,
details:details.value
})
});

const data = await res.json();

result.textContent = data.text;

// кодируем текст
const token = btoa(unescape(encodeURIComponent(data.text)));
localStorage.setItem("doc_token",token);

buy.style.display="block";
test.style.display="block";
};

// платная версия
buy.onclick=()=>{
window.location.href="https://buy.stripe.com/REPLACE_LINK";
};

// тестовая версия
test.onclick=()=>{
const token = localStorage.getItem("doc_token");
window.location.href="/api/export?token="+encodeURIComponent(token);
};
