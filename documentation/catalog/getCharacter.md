# Show character

Service to show character

**URL** : `/personaje/:id`

**Method** : `GET`

**Auth required** : NO

**Data constraints**

- **id**: It is the id of the valued character | Type integer

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "status": 200,
  "body": {
    "id": "String",
    "nombre": "String",
    "altura": "Integer",
    "masa": "Integer",
    "color_de_pelo": "String",
    "color_de_la_piel": "String",
    "color_de_ojos": "String",
    "nacimiento": "String",
    "genero": "String",
    "mundo_natal": "String",
    "peliculas": [ "String" ],
    "especies": [ "String" ],
    "vehiculos": [ "String" ],
    "naves_estelares": [ "String" ],
    "creado": "String",
    "editado": "String",
    "url": "https://swapi.py4e.com/api/people/{Integer}/",
    "puntajes": "Integer",
    "valoraciones": [
        {
            "id": "String",
            "puntaje": "Integer",
            "nota": "String"
        },
        {...}
    ],
    "updatedAt": "String"
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