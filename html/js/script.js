var Jobs; // Define Jobs array in the global scope
var playerName = "Loading";
var phoneNumber = "09352231380";
var PlayerJob = "Loading";

// Открытие и отображение UI
window.addEventListener("message", (event) => {
  switch (event.data.action) {
    case "SHOW_UI":
      playerName = event.data.name;
      phoneNumber = event.data.phone;
      PlayerJob = event.data.job;
      OpenJobCenter(true);
      Jobs = event.data.Jobs;
      ConfigJobs();
      break;
    default:
      break;
  }
});

// Клик подтвердить
$(document).ready(function () {
  function onSubmitClick(event) {
    const target = event.target;

    let jobID = $(target).attr("jobid");
    let jobDataID;
    if (!jobID) {
      jobDataID = $(target).closest(".job-item").attr("jobid");
    } else {
      jobDataID = jobID;
    }
    const dataArray = [
      { phone: document.querySelector("#PlayerPhone").innerText },
      { name: document.querySelector("#PlayerName").innerText },
      { job: document.querySelector("#PlayerJob").innerText },
    ];

    $.post(
      `http://${GetParentResourceName()}/whitelistRequest`,
      JSON.stringify({
        id: jobDataID,
        answers: getAnswers(),
        playerdata: dataArray,
      })
    );

    function getAnswers() {
      let answers = [];
      $(".p-quest-input").each(function (index) {
        answers.push({
          question: $(".p-quest-label[for='quest-" + (index + 1) + "']").text(),
          answer: $(this).val(),
        });
      });
      return answers;
    }
    OpenJobCenter(false);
    document.querySelector(".request-popup.show")?.classList.remove("show");
    document.querySelector(".p-overlay.show")?.classList.remove("show");
  }

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') { // Проверяем, была ли нажата клавиша ESC
      document.querySelector(".request-popup.show")?.classList.remove("show");
      document.querySelector(".p-overlay.show")?.classList.remove("show");
      mouseSoundEffect();
      OpenJobCenter(false);
      $(".p-overlay").removeClass("show", 1);
      $(".confirm-buy").removeClass("show", 1);
    }
});

  $(".p-btn-submit").on("click", onSubmitClick);
  $(".exitbtn").on("click", () => {
    mouseSoundEffect();
    OpenJobCenter(false);
    $(".p-overlay").removeClass("show", 1);
    $(".confirm-buy").removeClass("show", 1);
  });
});

const govermentTempleteServices = (props) => {
  const { lockClass,
    whiteClass,
    jobID,
    img,
    title,
    desc,
    id,
  } = props
  $(".p-title").html(title);
  return `
  <div class="job-item${lockClass}${whiteClass}" jobid = ${jobID}>
    <div class="job-left">
      ${lockClass ? `<img class="lock-img" src="${img}">` : ""}
      <img class="job-img" src="${img}">
    </div>
    <div class="job-right">
      <div class="job-content">
        <div class="job-title">${title}</div>
        <div class="job-desc">${desc}</div>
      </div>
      <div class="job-cta">
        <div class="job-btn"${id}>
          Выбрать
        </div>
      </div>
    </div>
  </div>
  `;
}

function ConfigJobs() {
  // Helper function to create job items
  function createJobItem(prop) {
    const lockClass = prop.lock ? " lock" : "",
      whiteClass = prop.whitelist ? " whitelist" : "",
      title = prop.jobname,
      desc = prop.desc,
      img = prop.image,
      jobID = prop.job_id,
      id = ` id="${jobID}"`

    return govermentTempleteServices({
      lockClass,
      whiteClass,
      jobID,
      img,
      title,
      desc,
      id,
    })

  }

  const jobList = $(".job-list");

  // Function to show job list based on the filter type
  function showJobs(type = "all") {
    const filtered_Jobs = Jobs;

    $(".nav-item.active").removeClass("active");
    $(`.nav-${type}`).addClass("active");

    if (filtered_Jobs.length > 0) {
      jobList.empty();
      filtered_Jobs.forEach(function (job) {
        jobList.append(createJobItem(job));
      });
    } else {
      jobList.html('<div class="no-job">nothing... !</div>');
    }
  }

  // Event handling using jQuery
  $(".nav-all").on("click", () => showJobs());

  // Add a click event handler to the p-btn element

  document.addEventListener("click", function (e) {
    // با کلیک به هر قسمت صفحه صدا پخش میشه

    let target = e.target;

    // اگر مقدار اطلاعات کاربر رو کلیک کنه٬ اطلاعات کپی بشن
    if (target.classList.contains("p-value")) {
      navigator.clipboard.writeText(target.innerText);
    }

    // вроде как не надо
    if (target.classList.contains("job-btn") && !target.closest(".lock")) {
      mouseSoundEffect();

      let jobID = target.getAttribute("id"),
        job = Jobs.find((p) => p.job_id == jobID);

      // تنظیم اسم شغل در پاپ اپ
      document.querySelector("#PlayerPhone").innerText = phoneNumber;
      document.querySelector(".p-jobname").innerText = job.jobname;
      // document.querySelector(".p-logo").innerHTML = `<img src="${job.logo}" />`;
      document.querySelector("#PlayerName").innerText = playerName;
      document.querySelector("#PlayerJob").innerText = PlayerJob;
      // تنظیم لوگو در پاپ اپ
      // document.querySelector(".p-logo").setAttribute("src", job.logo);

      let questHTML = "",
        i = 0;

      // یکبار خالی میکنیم سوالای قبلی رو
      document.querySelector(".p-questions").innerHTML = "";

      // سوالای جدید رو میریزیم
      job.questions.forEach(function (prop) {
        ++i;
        questHTML += `
          <div class="p-quest-label" for="quest-${i}">${prop}</div>
          <input class="p-quest-input" id="quest-${i}" />
        `;
      });
      document.querySelector(".p-questions").innerHTML = questHTML;

      // پاپ اپ باز میشه
      document.querySelector(".request-popup").classList.toggle("show", true);
      document.querySelector(".p-overlay").classList.toggle("show", true);
      document.querySelector(".p-btn-submit").setAttribute("jobid", job.job_id);
    }

    if (target.classList.contains("p-back")) {
      // پاپ اپ رو میبندیم
      document.querySelector(".request-popup.show")?.classList.remove("show");
      document.querySelector(".p-overlay.show")?.classList.remove("show");
    }
  });

  showJobs();
}

function OpenJobCenter(enable) {
  if (enable) {
    $("body").css("display", "block");
  } else {
    $("body").css("display", "none");
    $.post(`http://${GetParentResourceName()}/close`, JSON.stringify({}));
  }
}

function mouseSoundEffect() {
  new Audio("./audio/click.mp3").play();
}
