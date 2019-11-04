<template>
    <div class="assignment">
        <q-list id="chart" class="chart">
            <q-list-header class="title">
                <img src="../assets/result.png">
                <p><b>Average Score By Assignment</b></p>
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
                            <h6><b>Class: {{ className }}</b></h6>
                        </q-list-header>
                        <q-item v-for="(group, index) in groups" :key="index">
                            <q-item-side />
                            <q-item-main class="class-list-button">
                                <q-btn color="cyan-6" outline @click="show(index)">
                                    {{ group.assignment_name}}
                                </q-btn>
                            </q-item-main>
                            <q-item-side />
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
                    <!-- <q-list v-for="group in groups" :key="group.assignment_name" :style="group.display?'display:block':'display:none'"> -->
                    <q-list>
                        <q-list-header>
                            <!-- <b> {{group.assignment_name}} </b> -->
                            <b> {{selectedGroup.assignment_name}} </b>
                            <!-- <b> Class Name: {{group.className}} </b> -->
                        </q-list-header>
                        <q-item>
                            <q-item-main>
                                <q-table :data="selectedGroup.student_results" :pagination.sync="pagination" row-key="name" :columns="columns" hide-bottom>
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
    data() {
        return {
            // isdisplay: false,
            teachingGroupId: undefined,
            absenceDays: undefined,
            className: undefined,
            n3data: {},
            avescore: [],
            xname: [],
            groups: undefined,
            selectedGroup: undefined,
            pagination: {
                page: 1,
                rowsPerPage: 50
            },
            columns: [{
                    name: 'desc',
                    label: 'Name',
                    align: 'left',
                    // field: 'student_name',
                    field: row => row.actor.name,
                    sortable: false
                },
                { name: 'score', label: 'Score', field: row => row.result.score.scaled, format: val => `${val}`, sortable: true },
                { name: 'success', label: 'Success', field: row => row.result.success, format: val => `${val}`, sortable: false },
                { name: 'completion', label: 'Completion', field: row => row.result.completion, format: val => `${val}`, sortable: false },
                { name: 'duration', label: 'Duration', field: row => minutesFromIsoDuration( row.result.duration), format: val => `${val} min.`, sortable: false }
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
                    curve: 'straight',
                    width: 1
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
                        text: 'Average Results'
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
    created() {

        console.log(":value: ", this.value)
        this.teachingGroupId = this.value.RefId
        this.className = this.value.ShortName

        // 
        // retreive the linked data for this group...
        // 
        const axios = require('axios')
        axios({
            url: n3baseUrl + '/graphql',
            method: 'post',
            headers: authHeader,
            data: {
                query: progressQuery,
                variables: {
                    qspec: {
                        queryType: "traversalWithId",
                        queryValue: this.teachingGroupId,
                        traversal: [
                            "TeachingGroup",
                            "StudentPersonal",
                            "StudentAttendanceTimeList",
                            "StudentPersonal",
                            "TeachingGroup",
                            "GradingAssignment",
                            "XAPI",
                            "Subject",
                            "Unique.Link",
                            "Syllabus",
                            "Unique.Link",
                            "Lesson",
                            "Unique.Link",
                            "LessonSequence"
                        ],
                        filters: [
                            { eq: ["TeachingGroup", ".RefId", this.teachingGroupId] }
                        ]
                    }
                }
            }
        }).then((res) => {

            console.log("results: ", res.data.data.q)

            // restructure data for display...
            this.n3data = res.data.data.q
            this.n3data.assignmentResults = this.extractAssignmentResults(this.n3data);
            this.n3data.userIds = this.extractUserIds(this.n3data);
            this.n3data.attendanceReports = this.extractAttendanceReports(this.n3data);

            console.log("n3data: ", this.n3data)

            this.groups = []
            for (const gA of this.n3data.GradingAssignment.sort(this.assignmentCompare)) {
                this.xname.push(gA.Description)
                var group = {}
                group.assignment_name = gA.Description
                group.className = this.className
                group.student_results = this.n3data.assignmentResults[gA.DetailedDescriptionURL]
                this.groups.push(group)
            }

            console.log("groups: ", this.groups)

            for (let a of this.groups) {
                let scores = []
                // console.log(a.student_results)
                for (let b of a.student_results) {
                    // console.log(b.result_event.result.score.scaled)
                    scores.push(b.result.score.scaled)
                }
                console.log(scores)
                let sum = scores.reduce(function(a, b) { return a + b })
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

            this.groups[0].display = true
            this.selectedGroup = this.groups[0]
        })
    },
    methods: {
        show(i) {
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
                    this.selectedGroup = this.groups[i]
                    this.$q.loading.hide()
                }, 250)
            }, 250)
            console.log("show() groups: ", this.groups)
        },
        rowClick(row) {
            console.log(row)
            var userId = this.n3data.userIds[row.actor.mbox]
            var days = this.n3data.attendanceReports[userId]
            if (days === undefined) {
                this.absenceDays = 0
            } else {
                this.absenceDays = days.length
            }
            this.$q.dialog({
                title: `${row.actor.name}`,
                message: `Score: ${row.result.score.scaled} ` +
                    ` Absence days: ${this.absenceDays}`,
                ok: 'Close',
                color: 'cyan-6'
            })
        },
        // 
        // groups xapi results by grading assignment
        // 
        extractAssignmentResults(queryData) {

            var results = {};

            for (const xapi of queryData.XAPI) {
                // console.log(xapi);
                var xapiArray = results[xapi.object.id];
                if (!xapiArray || !xapiArray.length) {
                    results[xapi.object.id] = [];
                }
                results[xapi.object.id].push(xapi);
            }

            return results;
        },
        // 
        // sort grading assignemts by description
        // 
        assignmentCompare(a, b) {
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
        },
        // 
        // sort xapi results by score
        // 
        xapiCompare(a, b) {
            const gaA = a.result.score.scaled;
            const gaB = b.result.score.scaled;

            let comparison = 0;
            if (gaA > gaB) {
                comparison = 1;
            } else if (gaA < gaB) {
                comparison = -1;
            }
            return comparison * -1;
        },
        // 
        // access sif refids via xapi mbox
        // 
        extractUserIds(queryData) {

            let results = {};

            for (const sp of queryData.StudentPersonal) {
                // console.log(sp);
                var mbox = sp.PersonInfo.EmailList.Email[0].value;
                var spArray = results[mbox];
                if (!spArray || !spArray.length) {
                    results[mbox] = [];
                }
                results[mbox].push(sp.RefId);
            }

            return results;
        },
        // 
        // group attendance by student
        // 
        extractAttendanceReports(queryData) {

            let results = {};

            for (const satl of queryData.StudentAttendanceTimeList) {
                // console.log(sp);
                var sprefid = satl.StudentPersonalRefId;
                var satlArray = results[sprefid];
                if (!satlArray || !satlArray.length) {
                    results[sprefid] = [];
                }
                results[sprefid].push(satl);
            }

            return results;
        }




    }
}

// 
// helpers for parsing ISO durations from xAPI
// 
let regex = /P((([0-9]*\.?[0-9]*)Y)?(([0-9]*\.?[0-9]*)M)?(([0-9]*\.?[0-9]*)W)?(([0-9]*\.?[0-9]*)D)?)?(T(([0-9]*\.?[0-9]*)H)?(([0-9]*\.?[0-9]*)M)?(([0-9]*\.?[0-9]*)S)?)?/

let minutesFromIsoDuration = function(duration) {
    var matches = duration.match(regex);

    return parseFloat(matches[14]) || 0;
}


// 
// the GQL query
// 
var progressQuery = `
query fullTraversal($qspec: QueryInput!) {
  q(qspec: $qspec) {
    StudentAttendanceTimeList{
      RefId
      StudentPersonalRefId
      Date
      AttendanceTimes{
        AttendanceTime{
          AttendanceCode {
            Code
          }
          AttendanceStatus
          DurationValue
          EndTime
          StartTime
        }
      }
    }
    Syllabus {
      learning_area
      stage
      subject
      concepts {
        name
        description
      }
      inquiry_skills {
        name
        skills{
          ac
          skill
        }
      }
      tools{
        name
        examples
      }
    }
    StaffPersonal {
      LocalId
      RefId
      EmploymentStatus
    }
    GradingAssignment {
      RefId
      DetailedDescriptionURL
      Description
      PointsPossible
    }
    Subject {
      subject
      learning_area
      stage
      yrLvls
    }
    Lesson {
      lesson_id
      title
    }
    SchoolInfo {
      RefId
    }
    StudentPersonal {
      RefId
      LocalId
      PersonInfo {
        Name {
          FamilyName
          GivenName
        }
        EmailList{
          Email{
            value
          }
        }
      }
    }
    TeachingGroup {
      SchoolYear
      LongName
      ShortName
      RefId
      LocalId
    }
    LessonSequence{
      thestage
      thesubject
      userId
      lessonId
      lessonList{
       editcontent
        end{
          dateTime
        }
        start{
          dateTime
        }
        summary
      }
      thearea
      thecourse
      thedescription
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