var Chance = require('chance');
var chance = new Chance();

module.exports = function () {
  var data = {
    users: [
      {
        "id": 1,
        "givenName": "Peter",
        "familyName": "Capaldi"
      },
      {
        "id": 2,
        "givenName": "Matt",
        "familyName": "Smith"
      },
      {
        "id": 3,
        "givenName": "David",
        "familyName": "Tennant"
      },
      {
        "id": 4,
        "givenName": "Christopher",
        "familyName": "Eccleston"
      },
      {
        "id": 5,
        "givenName": "Jenna",
        "familyName": "Coleman"
      },
      {
        "id": 6,
        "givenName": "Alex",
        "familyName": "Kingston"
      },
      {
        "id": 7,
        "givenName": "Karen",
        "familyName": "Gillan"
      },
      {
        "id": 8,
        "givenName": "Catherine",
        "familyName": "Tate"
      }
    ],
    "types": [
      {
        "creationDateTime": "2016-08-17T13:07:19.800Z",
        "id": "article",
        "documentsCount": 5,
        "description": "Articles about the programme",
        "name": "Article Page",
        "colourId": "golden"
      },
      {
        "creationDateTime": "2016-08-13T15:00:44.200Z",
        "id": "profile",
        "documentsCount": 6,
        "description": "Actor/Actress profiles",
        "name": "Profile Page",
        "colourId": "spray"
      },
      {
        "creationDateTime": "2016-08-12T13:07:19.800Z",
        "id": "options",
        "documentsCount": 50,
        "description": "Programme options",
        "name": "Programme Options",
        "colourId": "red"
      },
      {
        "creationDateTime": "2016-08-11T16:00:44.200Z",
        "id": "contact",
        "documentsCount": 0,
        "description": "Contact Details",
        "name": "Contact Details",
        "colourId": "green"
      },
      {
        "creationDateTime": "2016-08-10T13:00:44.200Z",
        "id": "blog",
        "documentsCount": 0,
        "description": "Live Blog",
        "name": "Live Blog",
        "colourId": "blue"
      }
    ],
    files: []
  };

  for (var i = 0; i < 20; i++) {
    var date = chance.date({year: 2015});
    var modifiedDate = new Date(date.getTime() + chance.d8() * 60*60000);
    var id = chance.guid();
    var title = chance.sentence({words: 2});
    var status = chance.pickone(["In progress", "Published", "For review", "Approved"]);
    var scheduled = chance.bool({likelihood: 10});
    if (scheduled) {
      status = 'Scheduled'
    }
    data.files.push({
      "creationDateTime": date.toISOString(),
      "status": status,
      "modifiedBy": chance.d8(),
      "type": chance.pickone(["profile", "article", "options"]),
      "uri": "/project/test/content/" + id,
      "version": chance.d4(),
      "id": id,
      "fileId": title.replace(' ', '-'),
      "scheduled": scheduled,
      "title": title,
      "createdBy": chance.d8(),
      "modifiedDateTime": modifiedDate.toISOString(),
      "live": chance.bool({likelihood: 60})
    });
  }

  return data;
};
