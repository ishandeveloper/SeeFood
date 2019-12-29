const myClarifaiApiKey = 'edcb560c7cb747088dedd52680f6b5e9'
const myWolframAppId = 'TU38RL-E25YQ2GJ7K'

const app = new Clarifai.App({apiKey: myClarifaiApiKey})

predict_click = (value, source) => {
  let preview = $(".food-photo")
  let file = document.querySelector("input[type=file]").files[0]
  let loader  = "https://s3.amazonaws.com/static.mlh.io/icons/loading.svg"
  let reader = new FileReader()

  reader.addEventListener("load", () => {
    // preview.attr('style', 'background-image: url("' + reader.result + '")')
    doPredict({base64: reader.result.split('base64,')[1]})
  }, false)

  console.log(reader)

  if (file) {
      reader.readAsDataURL(file)
      $("#concepts").html('<img src="' + loader + '" class="loading" />')
  } else { alert("No File Selected!")}
}


useWebcamPicture = (value, base64data) => {
  let preview = $(".food-photo")
  let loader  = "https://s3.amazonaws.com/static.mlh.io/icons/loading.svg"
  let reader = value

  reader.addEventListener("load", () => {
    preview.attr('style', 'background-image: url("' + reader.result + '")')
    doPredict(base64data.split('base64,')[1])
  }, false)

  console.log(reader)
  $("#concepts").html('<img src="' + loader + '" class="loading" />')
}

readerOnLoad = reader => {
  preview.attr('style', 'background-image: url("' + reader.result + '")')
  doPredict(base64data.split('base64,')[1])
}

doPredict = value => {
    app.models.predict(Clarifai.FOOD_MODEL, value)
      .then(response => {
        if(response.rawData.outputs[0].data.hasOwnProperty("concepts")) {
          let tag = response.rawData.outputs[0].data.concepts[0].name;
          let url = `http://api.wolframalpha.com/v2/query?input=${tag}%20nutrition%20facts&appid=${myWolframAppId}`;
  
          getNutritionalInfo(url, result => {
            $('#concepts').html('<h3>'+ tag + '</h3>' + "<img src='"+result+"'>");

            $("#btn-share").attr('style', 'display: block')
          });
        }
      }, err => console.log(err)
    );
}

sharePicture = image => {
  let url = "http://google.com";
  let text = "Replace this with your text";
  window.open('http://twitter.com/share?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
}