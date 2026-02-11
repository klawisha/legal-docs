const result = document.getElementById("result");
const buy = document.getElementById("buy");

document.getElementById("gen").onclick = async () => {

  const res = await fetch("/api/generate", {
    method:"POST",
    headers:{ "Content-Type":"application/json"},
    body:JSON.stringify({
      name: name.value,
      country: country.value,
      details: details.value
    })
  });

  const data = await res.json();

  result.textContent = data.text;

  // шифруем текст в base64
  const token = btoa(unescape(encodeURIComponent(data.text)));
  localStorage.setItem("doc_token", token);

  buy.style.display="block";
};

buy.onclick = ()=>{
  // ссылка создается в Stripe
  window.location.href="https://buy.stripe.com/REPLACE_WITH_YOUR_LINK";
};
