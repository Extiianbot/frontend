const form = document.getElementById("form_sentence");
const textArea = document.getElementById("textarea");
const totalCount = document.getElementById("current");
const remainingCount = document.getElementById("maximum");

const MAX_CHARACTERS = 300;


if(form) {
    form.onsubmit = async function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        // let sentence = formData.get("sentence");
        const sentence = textArea.value;

        if(sentence.length <= 8){
            alertMessage("error","Please input at least 8 characters!");
              return;
        }
       
        if (sentence.length > MAX_CHARACTERS) {
          alertMessage("error", "Maximum character limit reached!");
          return;
        }

        const response = await window.axios.openAI(formData.get("sentence"));
        document.getElementById("sentence_corrected").innerHTML = JSON.stringify(response.choices[0].text).replace(/\\n/g, '');

    };
} 

function alertMessage(status, sentence) {
  window.Toastify.showToast({
    text: sentence,
    duration: 1000,
    stopOnFocus: true,
    position: "center",
    style: {
      background: status == "error" ? "#d0342c" : "green",
      textAlign: "center",
      color: "white",
      position: "absolute",
      maxHeight: "100px",
      top: "-100%",
      left: "40%",
      transform: "translatex(-50%)",
      display: "inline-block",
      margin: "2px",
      padding: "12px 20px",
      transition: "all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1)",
      boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
      borderRadius: "2px",
    }
  });
}



const updateCounter = () => {
  // userChar = textArea.value.length;
  // current.innerText = userChar;
  const userChar = textArea.value.length;
  totalCount.innerText = userChar;


  if (userChar >= MAX_CHARACTERS) {
    textArea.value = textArea.value.substring(0, MAX_CHARACTERS);
    textArea.style.color = "red";

} else {
    textArea.removeAttribute("disabled");
    textArea.style.color = "black";
}
}

// textArea.addEventListener("keyup", () => updateCounter());
textArea.addEventListener("input", updateCounter);