<template>
  <div class="assignment">
        <q-list id="chart" class="chart">
          <q-list-header class="title">
            <img src="../assets/result.png">
            <p><b>Average score of each class</b></p>
          </q-list-header>
          <q-item>
            <q-item-main>
              <apexchart type=line height=350 :options="chartOptions" :series="series" />
            </q-item-main>
          </q-item>
        </q-list>
    <hr>
    <div class="row class-table">
      <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 class-list">
        <div>
          <q-list>
            <q-list-header>
              <img src="../assets/class.png">
              <h6><b>Class Name</b></h6>
            </q-list-header>
            <q-item  v-for="(group, index) in groups" :key="index">
              <q-item-side/>
              <q-item-main class="class-list-button">
                <q-btn
                  color="cyan-6"
                  outline
                  @click="show(index)"
                  >
                  {{ group.assignment_name}}
                </q-btn>
              </q-item-main>
              <q-item-side/>
            </q-item>
          </q-list>
        </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 result" style="background-color: #FDFCFF">
        <!-- <q-list id="chart">
          <q-list-header class="title">
            <img src="../assets/result.png">
          </q-list-header>
          <q-item>
            <q-item-main>
              <apexchart type=line height=350 :options="chartOptions" :series="series" />
            </q-item-main>
          </q-item>
        </q-list> -->
        <div class="result">
          <q-list v-for="group in groups" :key="group" :style="group.display?'display:block':'display:none'">
            <q-list-header>
              <b> Class Name: {{group.assignment_name}} </b>
            </q-list-header>
            <q-item>
              <q-item-main>
                <q-table
                  :data="group.student_results"
                  :pagination.sync="pagination"
                  row-key="name"
                  :columns="columns"
                  hide-bottom
                >
                  <q-tr slot="body" slot-scope="props" :props="props" @click.native="rowClick(props.row)" class="cursor-pointer">
                    <q-td v-for="col in props.cols" :key="col.name" :props="props">
                      {{ col.value }}
                    </q-td>
                  </q-tr>
                </q-table>
                <!-- <q-spinner :style="isdisplay?'display:block':'display:none'"/> -->
              </q-item-main>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import assignment from './assignment.vue'
import VueApexCharts from 'vue-apexcharts'
import { QSpinnerFacebook } from 'quasar'
import { n3baseUrl, authHeader } from '../data'
export default {
  props: ['value'],
  components: {
    // appAssignment: assignment
    apexchart: VueApexCharts
  },
  data () {
    return {
      // isdisplay: false,
      avescore: [],
      xname: [],
      groups: undefined,
      pagination: {
        page: 1,
        rowsPerPage: 50
      },
      columns: [
        {
          name: 'desc',
          label: 'Name',
          align: 'left',
          field: 'student_name',
          sortable: false
        },
        { name: 'score', label: 'Score', field: row => row.result_event.result.score.scaled, format: val => `${val}`, sortable: true },
        { name: 'success', label: 'Success', field: row => row.result_event.result.success, format: val => `${val}`, sortable: false },
        { name: 'completion', label: 'Completion', field: row => row.result_event.result.completion, format: val => `${val}`, sortable: false },
        { name: 'duration', label: 'Duration', field: row => row.result_event.result.duration, format: val => `${val}`, sortable: false }
      ],
      series: [{
        name: 'Average Score',
        data: []
      }],
      chartOptions: {
        chart: {
          height: 350,
          shadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 1
          },
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        // title: {
        //   text: 'Average score of each class',
        //   align: 'left'
        // },
        colors: ['#00bcd4'],
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          }
        },
        xaxis: {
          categories: [],
          title: {
            text: 'Class name'
          }
        },
        yaxis: {
          min: 0,
          max: 100,
          title: {
            text: 'Score'
          }
        },
        markers: {
          size: 6
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
      }
    }
  },
  created () {

    // 
    // retreive the linked data for this group...
    // 
    const axios = require('axios')
    // 
    // get fulltraversal & supporting routines 
    // from mm2
    // 
    axios({
      url: 'http://localhost:1340/graphql',
      method: 'post',
      data: {
        query: `query progressReport($teaching_group_id: String!){
          reports(teaching_group_id: $teaching_group_id){
            assignment_results{
              assignment_name
              student_results {
                student_name
                absence_days
                result_event {
                  result {
                    completion
                    success
                    duration
                    score {
                      scaled
                    }
                  }
                }
              }
            }
          }
        }`,
        variables: {
          teaching_group_id: this.value.RefId
        }
      }
    }).then((res) => {
      let array = []
      array = res.data.data.reports[0].assignment_results
      this.groups = array.map(function (el) {
        var o = Object.assign({}, el)
        o.display = false
        return o
      })
      this.groups[0].display = true
      console.log(this.groups)
      for (let i of this.groups) {
        this.xname.push(i.assignment_name)
      }
      console.log(this.xname)
      for (let a of this.groups) {
        let scores = []
        // console.log(a.student_results)
        for (let b of a.student_results) {
          // console.log(b.result_event.result.score.scaled)
          scores.push(b.result_event.result.score.scaled)
        }
        console.log(scores)
        let sum = scores.reduce(function (a, b) { return a + b })
        let avg = sum / scores.length
        console.log(avg)
        this.avescore.push(avg)
      }
      console.log(this.avescore)
      this.series = [{
        data: this.avescore
      }]
      this.chartOptions = {
        xaxis: {
          categories: this.xname
        }
      }
    })
  },
  methods: {
    show (i) {
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'cyan-1'
      })
      setTimeout(() => {
        for (let a of this.groups) {
          a.display = false
        }
        setTimeout(() => {
          this.groups[i].display = true
          this.$q.loading.hide()
        }, 250)
      }, 250)
    },
    rowClick (row) {
      console.log(row)
      this.$q.dialog({
        title: `${row.student_name}`,
        message: `Score: ${row.result_event.result.score.scaled} ` + ` Absence days: ${row.absence_days}`,
        ok: 'Close',
        color: 'cyan-6'
      })
    }
  }
}

// 
// sort grading assignemts by description
// 
function assignmentCompare(a, b) {
    // Use toUpperCase() to ignore character casing
    const gaA = a.Description.toUpperCase();
    const gaB = b.Description.toUpperCase();

    let comparison = 0;
    if (gaA > gaB) {
        comparison = 1;
    } else if (gaA < gaB) {
        comparison = -1;
    }
    return comparison;
}

// 
// sort xapi results by score
// 
function xapiCompare(a, b) {
    const gaA = a.result.score.scaled;
    const gaB = b.result.score.scaled;

    let comparison = 0;
    if (gaA > gaB) {
        comparison = 1;
    } else if (gaA < gaB) {
        comparison = -1;
    }
    return comparison * -1;
}



// 
// groups xapi results by grading assignment
// 
function extractAssignmentResults(queryData) {

    results = {};

    for (const xapi of queryData.XAPI) {
        // console.log(xapi);
        xapiArray = results[xapi.object.id];
        if (!xapiArray || !xapiArray.length) {
            results[xapi.object.id] = [];
        }
        results[xapi.object.id].push(xapi);
    }

    return results;
}

// 
// access sif refids via xapi mbox
// 
function extractUserIds(queryData) {

    results = {};

    for (const sp of queryData.StudentPersonal) {
        // console.log(sp);
        mbox = sp.PersonInfo.EmailList.Email[0].value;
        spArray = results[mbox];
        if (!spArray || !spArray.length) {
            results[mbox] = [];
        }
        results[mbox].push(sp.RefId);
    }

    return results;
}

// 
// group attendance by student
// 
function extractAttendanceReports(queryData) {

    results = {};

    for (const satl of queryData.StudentAttendanceTimeList) {
        // console.log(sp);
        sprefid = satl.StudentPersonalRefId;
        satlArray = results[sprefid];
        if (!satlArray || !satlArray.length) {
            results[sprefid] = [];
        }
        results[sprefid].push(satl);
    }

    return results;
}



// 
// helpers for parsing ISO durations from xAPI
// 
var regex = /P((([0-9]*\.?[0-9]*)Y)?(([0-9]*\.?[0-9]*)M)?(([0-9]*\.?[0-9]*)W)?(([0-9]*\.?[0-9]*)D)?)?(T(([0-9]*\.?[0-9]*)H)?(([0-9]*\.?[0-9]*)M)?(([0-9]*\.?[0-9]*)S)?)?/

minutesFromIsoDuration = function(duration) {
    var matches = duration.match(regex);

    return parseFloat(matches[14]) || 0;
}


// 
// the GQL query
// 
var progressQuery = `
query fullTraversal($qspec: QueryInput!) {
  q(qspec: $qspec) {
    Lesson {
      title
    }
    LessonSequence{
      thesubject
      thecourse
      lessonList{
        summary
        editcontent
      }
    }
    Syllabus {
      learning_area
      stage
      subject
      overview
      courses {
        name
        focus
      }
      concepts {
        description
        name
      }
    }
    StaffPersonal {
      LocalId
      RefId
      EmploymentStatus
    }
    GradingAssignment {
      DetailedDescriptionURL
      PointsPossible
      Description
      TeachingGroupRefId
      RefId
    }
    Subject {
      subject
      learning_area
      stage
      yrLvls
      synonyms
    }
    Lesson {
      lesson_id
      content
      title
      stage
      subject
      teacher
      learning_area
    }
    SchoolInfo {
      StateProvinceId
      SchoolURL
      SchoolType
      RefId
      SchoolDistrict
      LocalId
      SchoolName
      CommonwealthId
      SchoolSector
    }
    StudentPersonal {
      RefId
      LocalId
      PersonInfo {
        Demographics {
          BirthDate
          IndigenousStatus
          Sex
        }
      }
    }
    TeachingGroup {
      SchoolYear
      LocalId
      LongName
      ShortName
      TimeTableSubjectRefId
      RefId
    }
    XAPI {
      id
      actor {
        mbox
        name
      }
      verb {
        id
        display {
          en_US
        }
      }
      object {
        id
        definition {
          name
          type
        }
      }
      result {
        duration
        success
        completion
        score {
          min
          max
          scaled
        }
      }
    }
  }
}
`



</script>
