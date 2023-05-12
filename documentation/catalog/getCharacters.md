# List characters

Service to list characters

**URL** : `/personajes/`

**Method** : `GET`

**Auth required** : NO

**Data constraints**

- **page**: Type integer

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "status": 200,
  "body": {
    "cantidad": 87,
    "pagina": "1",
    "personajes": [
      {
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
        "url": "https://swapi.py4e.com/api/people/{Integer}/"
      },
      {...}
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