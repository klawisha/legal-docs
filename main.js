const result = document.getElementById("result");
const test = document.getElementById("test");

document.getElementById("gen").onclick = async ()=>{

  const res = await fetch("/api/generate", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      name: name.value,
      country: country.value,
      details: details.value
    })
  });

  const data = await res.json();

  result.textContent = data.text;

  // кодируем текст для PDF
  const token = btoa(unescape(encodeURIComponent(data.text)));
  localStorage.setItem("doc_token", token);

  test.style.display="block";
};

// тестовая кнопка сразу скачивает PDF
test.onclick = ()=>{
  const token = localStorage.getItem("doc_token");
  window.location.href="/api/export?token="+encodeURIComponent(token);
};
