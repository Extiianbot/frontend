const form = document.getElementById("form_sentence");

if(form) {
    form.onsubmit = async function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        let sentence = formData.get("sentence");

        if(sentence.length <= 8){
            alertMessage("error", "Please input at least 8 characters!");
              return;
        }
       
        const response = await window.axios.openAI(formData.get("sentence"));
        document.getElementById("sentence_corrected").innerHTML = JSON.stringify(response.choices[0].text).replace(/\\n/g, '');

    };
} 

function alertMessage(status, sentence){
    window.Toastify.showToast({
        text: "This is a toast",
        duration: 5000,
        stopOnFocus: true, 
        style: {
          background: status == "error" ? "red":"green",
          textAlign: "center",
          color: "white",
          margin: "2px",
          padding: "5px"
        }
      });
}