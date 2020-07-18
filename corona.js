window.onload = function () {
  covid19();
  covid19world();
};

let totalIndia = [
  {
    active: "14493",
    confirmed: "18032",
    deaths: "570",
    deltaconfirmed: "728",
    deltadeaths: "11",
    deltarecovered: "115",
    lastupdatedtime: "18/04/2020 18:37:38",
    recovered: "2969",
    state: "Total",
    statecode: "TT",
    statenotes: "",
  },
];
function covid19() {
  const country = document.getElementById("country");
  const url = "https://api.covid19india.org/data.json";
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch(url, requestOptions)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      let lengthIndia = totalIndia.length;

      if (
        totalIndia[lengthIndia - 1].lastupdatedtime <
        data.statewise[0].lastupdatedtime
      ) {
        totalIndia.push(data.statewise[0]);
      }
      console.log(totalIndia);
      document.getElementById("case").innerHTML = data.statewise[0].confirmed;
      document.getElementById("deaths").innerHTML = data.statewise[0].deaths;
      document.getElementById("currentlyactive").innerHTML =
        data.statewise[0].active;
      document.getElementById("percentage").innerHTML =
        (
          (data.statewise[0].deaths / data.statewise[0].confirmed) *
          100
        ).toFixed(2) + "%";
      document.getElementById("recovery").innerHTML =
        (
          (data.statewise[0].recovered / data.statewise[0].confirmed) *
          100
        ).toFixed(2) + "%";
      document.getElementById("lastupdatedtime").innerHTML =
        data.statewise[0].lastupdatedtime;

      //weekly Recovery & Death Trends
      let case_length = data.cases_time_series.length;
      //console.log(case_length);
      let current_week_recovery;
      let last_week_recovery;
      let current_week_death;
      let last_week_death;

      current_week_recovery =
        data.cases_time_series[case_length - 1].totalrecovered -
        data.cases_time_series[case_length - 8].totalrecovered;
      last_week_recovery =
        data.cases_time_series[case_length - 9].totalrecovered -
        data.cases_time_series[case_length - 17].totalrecovered;
      current_week_death =
        data.cases_time_series[case_length - 1].totaldeceased -
        data.cases_time_series[case_length - 8].totaldeceased;
      last_week_death =
        data.cases_time_series[case_length - 9].totaldeceased -
        data.cases_time_series[case_length - 17].totaldeceased;
      // console.log(data.cases_time_series[case_length - 1].totaldeceased);
      // console.log(current_week_death);
      // console.log(last_week_recovery);
      // console.log(current_week_recovery);

      document.getElementById("recovertrend").innerHTML =
        (
          ((current_week_recovery - last_week_recovery) / last_week_recovery) *
          100
        ).toFixed(2) + "%";
      document.getElementById("deathtrend").innerHTML =
        (
          ((current_week_death - last_week_death) / last_week_death) *
          100
        ).toFixed(2) + "%";

      function myFunction(text, H2, DIV) {
        var free_state = document.getElementById("free_state");
        var h = document.createElement(H2);
        var t = document.createTextNode(text);
        h.appendChild(t);
        document.getElementById(DIV).appendChild(h);
      }

      $nosState = data.statewise.length;
      console.log($nosState);
      for ($i = 1; $i < $nosState; $i++) {
        if (data.statewise[$i].confirmed == 0) {
          // console.log(data.statewise[$i].state);
          myFunction(data.statewise[$i].state, "H2", "free_state");
        }
      }
      $recoveredCount = 0;
      for ($i = 1; $i < $nosState; $i++) {
        if (data.statewise[$i].active == 0 && data.statewise[$i].deaths > 0) {
          // console.log(data.statewise[$i].state);
          $recoveredCount++;
          myFunction(data.statewise[$i].state, "H2", "recov_state1");
        }
      }

      if ($recoveredCount == 0) {
        myFunction("No States has recovered", "H2", "recov_state1");
      }

      for ($i = 1; $i < $nosState; $i++) {
        if (
          data.statewise[$i].confirmed > 0 &&
          data.statewise[$i].confirmed == data.statewise[$i].recovered
        ) {
          // console.log(data.statewise[$i].state);
          myFunction(data.statewise[$i].state, "H2", "recov_state");
        }
      }

      let stateActive = [];
      let stateConfirmed = [];
      let stateDeath = [];
      let stateRecovered = [];
      let stateName = [];

      for ($i = 1; $i < $nosState; $i++) {
        stateActive.push(data.statewise[$i].active);
        stateConfirmed.push(data.statewise[$i].confirmed);
        stateDeath.push(data.statewise[$i].deaths);
        stateRecovered.push(data.statewise[$i].recovered);
        stateName.push(data.statewise[$i].state);
      }

      let tempArray = [...stateActive];
      tempArray.sort((a, b) => b - a);
      // console.log(stateActive);
      // console.log(tempArray);
      for ($i = 0; $i < 5; $i++) {
        let indexNo = stateActive.indexOf(tempArray[$i]);
        let x = document.getElementById("top_5");
        x.innerHTML +=
          '<div class="col-3"><h4>' +
          stateName[indexNo] +
          '</h4></div><div class="col-3"><h2>' +
          stateActive[indexNo] +
          '</h2></div><div class="col-3"><h2>' +
          stateDeath[indexNo] +
          '</h2></div><div class="col-3"><h2>' +
          stateRecovered[indexNo] +
          "</h2></div>";
      }

      let rateRecovery = stateRecovered.map(function (n, i) {
        return (n * 100) / stateConfirmed[i];
      });

      console.log(rateRecovery);
      let tempArray1 = [...rateRecovery];
      tempArray1.sort((a, b) => b - a);
      $j = 0;
      document.getElementById("trend_rate_recover").innerHTML =
        '<div class="row"><div class="col-7"><h2>State</h2></div><div class="col-5"><h2>Recovery Rate</h2></div></div>';
      for ($i = 0; $i < 5 + $j; $i++) {
        if (tempArray1[$i] < 100) {
          let indexNo1 = rateRecovery.indexOf(tempArray1[$i]);
          //console.log(indexNo1);
          console.log(rateRecovery[indexNo1]);
          console.log(stateName[indexNo1]);
          document.getElementById("trend_rate_recover").innerHTML +=
            '<div class="row"><div class="col-7"><h4>' +
            stateName[indexNo1] +
            '</h4></div><div class="col-5"><h2>' +
            rateRecovery[indexNo1].toFixed(2) +
            "</h2></div></div>";
        } else if (tempArray1[$i] == 100) {
          $j++;
        }
      }

      let rateDeath = stateDeath.map(function (n, i) {
        return (n * 100) / stateConfirmed[i];
      });
      document.getElementById("trend_rate_death").innerHTML =
        '<div class="row"><div class="col-7"><h2>State</h2></div><div class="col-5"><h2>Death Rate</h2></div></div>';
      console.log(rateDeath);
      let tempArray2 = [...rateDeath];
      tempArray2.sort((a, b) => b - a);
      //$k=0;
      for (
        $i = 0;
        $i < 5;
        $i++ // {  if(tempArray2[$i]<100)
      ) {
        let indexNo2 = rateDeath.indexOf(tempArray2[$i]);
        //console.log(indexNo1);
        console.log(rateDeath[indexNo2]);
        console.log(stateName[indexNo2]);
        document.getElementById("trend_rate_death").innerHTML +=
          '<div class="row"><div class="col-7"><h4>' +
          stateName[indexNo2] +
          '</h4></div><div class="col-5"><h2>' +
          rateDeath[indexNo2].toFixed(2) +
          "</h2></div></div>";
      }

      $lenPositiveCase = data.cases_time_series.length;

      for ($i = 5; $i > 0; $i--) {
        myFunction(
          data.cases_time_series[$lenPositiveCase - $i].dailyconfirmed,
          "A",
          "case_trends"
        );
      }

      $change =
        data.cases_time_series[$lenPositiveCase - 1].dailyconfirmed -
        data.cases_time_series[$lenPositiveCase - 2].dailyconfirmed;
      // console.log(data.tested[$len - 2].positivecasesfromsamplesreported);
      document.getElementById("updatetimestamp").innerHTML =
        data.cases_time_series[$lenPositiveCase - 1].date;
      document.getElementById("positivecasesfromsamplesreported").innerHTML =
        data.cases_time_series[$lenPositiveCase - 1].dailyconfirmed;
      document.getElementById("increaseoveryesterday").innerHTML = $change;
      if (data.cases_time_series[$lenPositiveCase - 2].dailyconfirmed == 0) {
        document.getElementById("increasepercentageoveryesterday").innerHTML =
          "";
      } else {
        document.getElementById("increasepercentageoveryesterday").innerHTML =
          (
            ($change /
              data.cases_time_series[$lenPositiveCase - 2].dailyconfirmed) *
            100
          ).toFixed(2) + "%";
      }
      $len = data.tested.length;
      document.getElementById("totalsamplestested").innerHTML =
        data.tested[$len - 1].totalsamplestested;
      // document.getElementById("totalindividualstested").innerHTML =
      //   data.tested[$len - 1].totalindividualstested;
      $casesWeekly = 0;
      $casesLastWeekly = 0;
      $testcasesWeekly = 0;
      $testcasesLastWeekly = 0;
      for ($j = 0; $j < 7; $j++) {
        $casesWeekly =
          $casesWeekly +
          Number(data.tested[$len - ($j + 1)].positivecasesfromsamplesreported);
        $casesLastWeekly = +Number(
          data.tested[$len - ($j + 7)].positivecasesfromsamplesreported
        );
        $testcasesWeekly = +Number(
          data.tested[$len - ($j + 1)].totalsamplestested
        );
        $testcasesLastWeekly = +Number(
          data.tested[$len - ($j + 7)].totalsamplestested
        );
        // console.log($casesWeekly);
        // console.log($casesLastWeekly);
      }
      // console.log($casesWeekly);
      // console.log(typeof $casesWeekly);

      document.getElementById("weekly").innerHTML = $casesWeekly.toFixed(0);
      document.getElementById("increaserateweekly").innerHTML = (
        $casesWeekly / 7
      ).toFixed(0);
      document.getElementById("increaseratelastweekly").innerHTML = (
        $casesLastWeekly / 7
      ).toFixed(0);
      if ($casesLastWeekly == 0) {
        document.getElementById("increasepercentageweekly").innerHTML = "";
      } else {
        document.getElementById("increasepercentageweekly").innerHTML =
          (
            (($casesWeekly - $casesLastWeekly) / $casesLastWeekly) *
            100
          ).toFixed(2) + "%";
      }
      document.getElementById(
        "testweekly"
      ).innerHTML = $testcasesWeekly.toFixed(0);
      document.getElementById("testincreaserateweekly").innerHTML = (
        $testcasesWeekly / 7
      ).toFixed(0);
      document.getElementById("testincreaseratelastweekly").innerHTML = (
        $testcasesLastWeekly / 7
      ).toFixed(0);
      if ($testcasesLastWeekly == 0) {
        document.getElementById("testincreasepercentageweekly").innerHTML = "";
      } else {
        document.getElementById("testincreasepercentageweekly").innerHTML =
          (
            (($testcasesWeekly - $testcasesLastWeekly) / $testcasesLastWeekly) *
            100
          ).toFixed(2) + "%";
      }
    })

    .catch(function (error) {
      console.log(error);
    });
  setTimeout(covid19, 43200000);
}

function covid19world() {
  const country = document.getElementById("country");
  const url = "https://api.covid19api.com/summary";
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch(url, requestOptions)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      $active =
        data.Global["TotalConfirmed"] -
        data.Global["TotalDeaths"] -
        data.Global["TotalRecovered"];
      //console.log($active);
      document.getElementById("worldcase").innerHTML =
        data.Global["TotalConfirmed"];
      document.getElementById("worlddeaths").innerHTML =
        data.Global["TotalDeaths"];
      document.getElementById("worldcurrentlyactive").innerHTML = $active;
      document.getElementById("worldpercentage").innerHTML =
        ((data.Global["TotalDeaths"] / $active) * 100).toFixed(2) + "%";
      document.getElementById("worldlastupdatedtime").innerHTML = data.Date;
      //   console.log(data.Global.length);
      //   console.log(data.tested.length);

      function myFunctionWorld(text) {
        //var free_state=document.getElementById("free_state");
        var h = document.createElement("a");
        var t = document.createTextNode(text);
        h.appendChild(t);
        document.getElementById("worldfree_state").appendChild(h);
      }
      $freeCountries = 0;
      let highestCountry = [];
      let highestDeath = [];
      let deathRate = [];
      let recoveryRate = [];
      let dthRateCountry = [];
      let recoveryRateCountry = [];
      $len = data.Countries.length;
      for ($i = 0; $i < $len; $i++) {
        if (data.Countries[$i].TotalConfirmed == 0) {
          // console.log(data.Countries[$i].Country);
          $freeCountries++;
          myFunctionWorld(data.Countries[$i].Country + ", ");
        }
        if (Array.isArray(highestDeath) && highestDeath.length) {
          $min = Math.min(...highestDeath);
          $indexValue = highestDeath.indexOf($min);

          if ($min < data.Countries[$i].TotalDeaths) {
            highestDeath[$indexValue] = data.Countries[$i].TotalDeaths;
            highestCountry[$indexValue] = data.Countries[$i].Country;
            //console.log(highestDeath[$indexValue]);
          }
        } else {
          highestDeath[0] = 0;
          highestDeath[1] = 0;
          highestDeath[2] = 0;
        }
        //console.log(highestDeath);
        if (Array.isArray(deathRate) && deathRate.length) {
          $minDeathRate = Math.min(...deathRate);
          $indexDeathRate = deathRate.indexOf($minDeathRate);
          if (
            $minDeathRate <
            (data.Countries[$i].TotalDeaths * 100) /
              data.Countries[$i].TotalConfirmed
          ) {
            deathRate[$indexDeathRate] =
              (data.Countries[$i].TotalDeaths * 100) /
              data.Countries[$i].TotalConfirmed;
            dthRateCountry[$indexDeathRate] = data.Countries[$i].Country;
          }
        } else {
          deathRate[0] = 0.0;
          deathRate[1] = 0.0;
          deathRate[2] = 0.0;
        }
        if (Array.isArray(recoveryRate) && recoveryRate.length) {
          $minrecoveryRate = Math.min(...recoveryRate);
          $indexrecoveryRate = recoveryRate.indexOf($minrecoveryRate);
          if (
            $minrecoveryRate <
            (data.Countries[$i].TotalRecovered * 100) /
              data.Countries[$i].TotalConfirmed
          ) {
            recoveryRate[$indexrecoveryRate] =
              (data.Countries[$i].TotalRecovered * 100) /
              data.Countries[$i].TotalConfirmed;
            recoveryRateCountry[$indexrecoveryRate] =
              data.Countries[$i].Country;
          }
        } else {
          recoveryRate[0] = 0.0;
          recoveryRate[1] = 0.0;
          recoveryRate[2] = 0.0;
        }
      }
      for ($i = 0; $i < $len; $i++) {
        document.getElementById("worldfree").innerHTML = $freeCountries;
        document.getElementById("worldtime").innerHTML = data.Date;
      }

      function topDeathNation(text1, h3, Div_class) {
        var h = document.createElement(h3);
        var t1 = document.createTextNode(text1);
        h.appendChild(t1);
        document.getElementById(Div_class).appendChild(h);
      }

      // let highestCountry1 = [];
      // let highestDeath1 = [];

      $min = Math.min(...highestDeath);
      $max = Math.max(...highestDeath);
      $indexValueMin = highestDeath.indexOf($min);
      $indexValueMax = highestDeath.indexOf($max);

      const arrayCopy = [...highestDeath];
      const secondLargestNum = arrayCopy.sort((a, b) => a - b)[
        arrayCopy.length - 2
      ];
      $indexValue2nd = highestDeath.indexOf(secondLargestNum);

      topDeathNation(highestCountry[$indexValueMax], "H4", "top_3nation");
      topDeathNation(highestDeath[$indexValueMax], "H2", "top_3deaths");
      topDeathNation(highestCountry[$indexValue2nd], "H4", "top_3nation");
      topDeathNation(highestDeath[$indexValue2nd], "H2", "top_3deaths");
      topDeathNation(highestCountry[$indexValueMin], "H4", "top_3nation");
      topDeathNation(highestDeath[$indexValueMin], "H2", "top_3deaths");

      //console.log(deathRate[0]);
      // console.log(dthRateCountry[0]);

      $min1 = Math.min(...deathRate);
      $max1 = Math.max(...deathRate);
      $indexValueMin1 = deathRate.indexOf($min1);
      $indexValueMax1 = deathRate.indexOf($max1);

      const arrayCopy1 = [...deathRate];
      const secondLargestNum1 = arrayCopy1.sort((a, b) => a - b)[
        arrayCopy1.length - 2
      ];
      $indexValue2nd1 = deathRate.indexOf(secondLargestNum1);
      //console.log(dthRateCountry[$indexValueMax1]);
      $r = deathRate[$indexValueMax1];
      //console.log($r);
      topDeathNation(dthRateCountry[$indexValueMax1], "H4", "top_3nation1");
      topDeathNation($r.toFixed(0), "H2", "top_3death1");
      topDeathNation(dthRateCountry[$indexValue2nd1], "H4", "top_3nation1");
      topDeathNation(
        deathRate[$indexValue2nd1].toFixed(0),
        "H2",
        "top_3death1"
      );
      topDeathNation(dthRateCountry[$indexValueMin1], "H4", "top_3nation1");
      topDeathNation(
        deathRate[$indexValueMin1].toFixed(0),
        "H2",
        "top_3death1"
      );

      $min11 = Math.min(...recoveryRate);
      $max11 = Math.max(...recoveryRate);
      $indexValueMin11 = recoveryRate.indexOf($min11);
      $indexValueMax11 = recoveryRate.indexOf($max11);

      const arrayCopy11 = [...recoveryRate];
      const secondLargestNum11 = arrayCopy11.sort((a, b) => a - b)[
        arrayCopy11.length - 2
      ];
      $indexValue2nd11 = recoveryRate.indexOf(secondLargestNum11);
      //  console.log(recoveryRateCountry[$indexValueMax11]);
      $r = recoveryRate[$indexValueMax11];
      //console.log($r);
      topDeathNation(
        recoveryRateCountry[$indexValueMax11],
        "H4",
        "top_3nation11"
      );
      topDeathNation($r.toFixed(0), "H2", "top_3death11");
      topDeathNation(
        recoveryRateCountry[$indexValue2nd11],
        "H4",
        "top_3nation11"
      );
      topDeathNation(
        recoveryRate[$indexValue2nd11].toFixed(0),
        "H2",
        "top_3death11"
      );
      topDeathNation(
        recoveryRateCountry[$indexValueMin11],
        "H4",
        "top_3nation11"
      );
      topDeathNation(
        recoveryRate[$indexValueMin11].toFixed(0),
        "H2",
        "top_3death11"
      );
      //else {
      //     document.getElementById("increasepercentageoveryesterday").innerHTML =
      //       (
      //         ($change / data.tested[$len - 2].positivecasesfromsamplesreported) *
      //         100
      //       ).toFixed(2) + "%";
      //   }
      //   document.getElementById("totalsamplestested").innerHTML =
      //     data.tested[$len - 1].totalsamplestested;
      //   document.getElementById("totalindividualstested").innerHTML =
      //     data.tested[$len - 1].totalindividualstested;
      //   $casesWeekly = 0;
      //   $casesLastWeekly = 0;
      //   $testcasesWeekly = 0;
      //   $testcasesLastWeekly = 0;
      //   for ($j = 0; $j < 7; $j++) {
      //     $casesWeekly =
      //       $casesWeekly +
      //       Number(data.tested[$len - ($j + 1)].positivecasesfromsamplesreported);
      //     $casesLastWeekly = +Number(
      //       data.tested[$len - ($j + 7)].positivecasesfromsamplesreported
      //     );
      //     $testcasesWeekly = +Number(
      //       data.tested[$len - ($j + 1)].totalsamplestested
      //     );
      //     $testcasesLastWeekly = +Number(
      //       data.tested[$len - ($j + 7)].totalsamplestested
      //     );
      //     // console.log($casesWeekly);
      //     // console.log($casesLastWeekly);
      //   }
      //   // console.log($casesWeekly);
      //   // console.log(typeof $casesWeekly);

      //   document.getElementById("weekly").innerHTML = $casesWeekly.toFixed(0);
      //   document.getElementById("increaserateweekly").innerHTML = (
      //     $casesWeekly / 7
      //   ).toFixed(0);
      //   document.getElementById("increaseratelastweekly").innerHTML = (
      //     $casesLastWeekly / 7
      //   ).toFixed(0);
      //   document.getElementById("increasepercentageweekly").innerHTML =
      //     ((($casesWeekly - $casesLastWeekly) / $casesLastWeekly) * 100).toFixed(
      //       2
      //     ) + "%";
      //   document.getElementById(
      //     "testweekly"
      //   ).innerHTML = $testcasesWeekly.toFixed(0);
      //   document.getElementById("testincreaserateweekly").innerHTML = (
      //     $testcasesWeekly / 7
      //   ).toFixed(0);
      //   document.getElementById("testincreaseratelastweekly").innerHTML = (
      //     $testcasesLastWeekly / 7
      //   ).toFixed(0);
      //   document.getElementById("testincreasepercentageweekly").innerHTML =
      //     (
      //       (($testcasesWeekly - $testcasesLastWeekly) / $testcasesLastWeekly) *
      //       100
      //     ).toFixed(2) + "%";
    })

    .catch(function (error) {
      console.log(error);
    });
  setTimeout(covid19world, 43200000);
}
