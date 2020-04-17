window.onload = function () {
  covid19();
  covid19world();
};

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
      document.getElementById("case").innerHTML = data.statewise[0].confirmed;
      document.getElementById("deaths").innerHTML = data.statewise[0].deaths;
      document.getElementById("currentlyactive").innerHTML =
        data.statewise[0].active;
      document.getElementById("percentage").innerHTML =
        ((data.statewise[0].deaths / data.statewise[0].active) * 100).toFixed(
          2
        ) + "%";
      document.getElementById("lastupdatedtime").innerHTML =
        data.statewise[0].lastupdatedtime;
      // console.log(data.statewise.length);
      //console.log(data.tested.length);

      function myFunction(text, H2, DIV) {
        //var free_state=document.getElementById("free_state");
        var h = document.createElement(H2);
        var t = document.createTextNode(text);
        h.appendChild(t);
        document.getElementById(DIV).appendChild(h);
      }

      $nosState = data.statewise.length;
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

      let indiaState = [];
      let deathState = [];
      let deathRateI = [];
      let recoveryRateI = [];
      let dthRateIndia = [];
      let recoveryRateIndia = [];

      for ($i = 1; $i < $nosState; $i++) {
        if (
          data.statewise[$i].confirmed > 0 &&
          data.statewise[$i].confirmed == data.statewise[$i].recovered
        ) {
          // console.log(data.statewise[$i].state);
          myFunction(data.statewise[$i].state, "H2", "recov_state");
        }
      }

      for ($i = 0; $i < $nosState; $i++) {
        if (Array.isArray(deathState) && deathState.length) {
          $minX = Math.min(...deathState);
          $indexMinValueX = deathState.indexOf($minX);
          console.log($minX);
          console.log(data.statewise[$i].deaths);
          console.log(data.statewise[$i].state);
          console.log($i);
          if ($minX < data.statewise[$i].deaths) {
            deathState[$indexMinValueX] = Number(data.statewise[$i].deaths);
            indiaState[$indexMinValueX] = data.statewise[$i].state;

            // if ((data.statewise[$i].state = "Maharashtra")) {
            console.log($i);
            // }
            //     console.log(deathState);
          }
        } else {
          deathState[0] = 0;
          deathState[1] = 0;
          deathState[2] = 0;
        }
        console.log($i);
        console.log(deathState);

        if (data.statewise[$i].deaths > 0) {
          if (Array.isArray(deathRateI) && deathRateI.length) {
            $minDeathRateI = Math.min(...deathRateI);
            $indexDeathRateI = deathRateI.indexOf($minDeathRateI);
            if (
              $minDeathRateI <
              (data.statewise[$i].deaths * 100) / data.statewise[$i].confirmed
            ) {
              deathRateI[$indexDeathRateI] =
                (data.statewise[$i].deaths * 100) /
                data.statewise[$i].confirmed;
              dthRateIndia[$indexDeathRateI] = data.statewise[$i].state;
            }
          } else {
            deathRateI[0] = 0.0;
            deathRateI[1] = 0.0;
            deathRateI[2] = 0.0;
          }

          if (Array.isArray(recoveryRateI) && recoveryRateI.length) {
            $minrecoveryRateI = Math.min(...recoveryRateI);
            $indexrecoveryRateI = recoveryRateI.indexOf($minrecoveryRateI);
            if (
              $minrecoveryRateI <
              (data.statewise[$i].recovered * 100) /
                data.statewise[$i].confirmed
            ) {
              recoveryRateI[$indexrecoveryRateI] = Number(
                (data.statewise[$i].recovered * 100) /
                  data.statewise[$i].confirmed
              );
              recoveryRateIndia[$indexrecoveryRateI] = data.statewise[$i].state;
            }
          } else {
            recoveryRateI[0] = 0.0;
            recoveryRateI[1] = 0.0;
            recoveryRateI[2] = 0.0;
          }
        }
      }

      function topStates(text1, h3, Div_class) {
        var h = document.createElement(h3);
        var t1 = document.createTextNode(text1);
        h.appendChild(t1);
        document.getElementById(Div_class).appendChild(h);
      }

      // let highestCountry1 = [];
      // let highestDeath1 = [];

      $minIndia1 = Math.min(...deathState);
      $maxIndia1 = Math.max(...deathState);
      $indexValueMinIndia1 = deathState.indexOf($minIndia1);
      $indexValueMaxIndia1 = deathState.indexOf($maxIndia1);
      //console.log($maxIndia1);
      // console.log($minIndia1);
      //console.log(highestDeathI[$indexValueMaxIndia1]);
      //console.log(indiaState[$indexValueMaxIndia1]);
      const arrayCopyIndia1 = [...deathState];
      const secondLargestNumIndia1 = arrayCopyIndia1.sort((a, b) => a - b)[
        arrayCopyIndia1.length - 2
      ];
      $indexValue2ndIndia1 = deathState.indexOf(secondLargestNumIndia1);

      topStates(indiaState[$indexValueMaxIndia1], "H4", "top_3state");
      topStates(deathState[$indexValueMaxIndia1], "H2", "top_3deathi");
      topStates(indiaState[$indexValue2ndIndia1], "H4", "top_3state");
      topStates(deathState[$indexValue2ndIndia1], "H2", "top_3deathi");
      topStates(indiaState[$indexValueMinIndia1], "H4", "top_3state");
      topStates(deathState[$indexValueMinIndia1], "H2", "top_3deathi");

      //console.log(deathRate[0]);
      // console.log(dthRateIndia[0]);
      //console.log(dthRateIndia);
      // console.log(deathRateI);

      $minI1 = Math.min(...deathRateI);
      // console.log($minI1);
      $maxI1 = Math.max(...deathRateI);
      $indexValueMinI1 = deathRateI.indexOf($minI1);
      $indexValueMaxI1 = deathRateI.indexOf($maxI1);

      const arrayCopyI1 = [...deathRateI];
      // console.log(arrayCopyI1);
      // console.log(arrayCopyI1.sort());

      const secondLargestNumI1 = arrayCopyI1.sort((a, b) => a - b)[1];
      // console.log(secondLargestNumI1);
      $indexValue2ndI1 = deathRateI.indexOf(secondLargestNumI1);
      //console.log(dthRateIndia[$indexValue2ndI1]);
      $r = deathRateI[$indexValueMaxI1];
      //console.log($r);
      //console.log(dthRateIndia[$indexValue2ndI1]);
      topStates(dthRateIndia[$indexValueMaxI1], "H4", "top_3state1");
      topStates($r.toFixed(2), "H2", "top_3deathi1");
      topStates(dthRateIndia[$indexValue2ndI1], "H4", "top_3state1");
      topStates(deathRateI[$indexValue2ndI1].toFixed(2), "H2", "top_3deathi1");
      topStates(dthRateIndia[$indexValueMinI1], "H4", "top_3state1");
      topStates(deathRateI[$indexValueMinI1].toFixed(2), "H2", "top_3deathi1");

      $minI11 = Math.min(...recoveryRateI);
      $maxI11 = Math.max(...recoveryRateI);
      $indexValueMinI11 = recoveryRateI.indexOf($minI11);
      $indexValueMaxI11 = recoveryRateI.indexOf($maxI11);

      const arrayCopyI11 = [...recoveryRateI];
      const secondLargestNumI11 = arrayCopyI11.sort((a, b) => a - b)[
        arrayCopyI11.length - 2
      ];
      $indexValue2ndI11 = recoveryRateI.indexOf(secondLargestNumI11);
      //console.log(recoveryRateIndia[$indexValueMaxI11]);
      $r = recoveryRateI[$indexValueMaxI11];
      //console.log($r);
      topStates(recoveryRateIndia[$indexValueMaxI11], "H4", "top_3state11");
      topStates($r.toFixed(2), "H2", "top_3deathi11");
      topStates(recoveryRateIndia[$indexValue2ndI11], "H4", "top_3state11");
      topStates(
        recoveryRateI[$indexValue2ndI11].toFixed(2),
        "H2",
        "top_3deathi11"
      );
      topStates(recoveryRateIndia[$indexValueMinI11], "H4", "top_3state11");
      topStates(
        recoveryRateI[$indexValueMinI11].toFixed(2),
        "H2",
        "top_3deathi11"
      );

      // console.log(data.tested.length);
      $len = data.tested.length;
      $change =
        data.tested[$len - 1].positivecasesfromsamplesreported -
        data.tested[$len - 2].positivecasesfromsamplesreported;
      document.getElementById("updatetimestamp").innerHTML =
        data.tested[$len - 1].updatetimestamp;
      document.getElementById("positivecasesfromsamplesreported").innerHTML =
        data.tested[$len - 1].positivecasesfromsamplesreported;
      document.getElementById("increaseoveryesterday").innerHTML = $change;
      if (data.tested[$len - 2].positivecasesfromsamplesreported == 0) {
        document.getElementById("increasepercentageoveryesterday").innerHTML =
          "";
      } else {
        document.getElementById("increasepercentageoveryesterday").innerHTML =
          (
            ($change / data.tested[$len - 2].positivecasesfromsamplesreported) *
            100
          ).toFixed(2) + "%";
      }
      document.getElementById("totalsamplestested").innerHTML =
        data.tested[$len - 1].totalsamplestested;
      document.getElementById("totalindividualstested").innerHTML =
        data.tested[$len - 1].totalindividualstested;
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
