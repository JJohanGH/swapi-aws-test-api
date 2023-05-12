# Character rating

Service to character rating. To obtain the url of the character you must extract it from the list of characters

**URL** : `/puntuar-favorito/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "url_del_personaje": "String",
    "puntaje": "Integer",
    "nota": "String"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "status": 200,
  "body": {
    "people_url": "String",
    "id": "String",
    "points": "Integer",
    "updatedAt": "String",
    "ratings": [
      {
        "id": "String",
        "character_id": "String",
        "points": "Integer",
        "note": "String",
        "createdAt": "String"
      }
    ]
  }
}
```

## Error Response

**Condition** : Servers are not working as expected. The request is probably valid but needs to be requested again later.

**Code** : `500 INTERNAL SERVER ERROR`

**Content** :

```json
{
  "message": "Internal Server Error"
}
```