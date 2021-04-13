var ModelUser = {
  list : {
    modelName : 'user',
    routeName : null,
    value : [{
      "id": 3,
      "name": "Amministratore",
      "email": "amministratore@amministratore.it",
      "email_verified_at": 0,
      "banned": 0,
      "created_at": "2021-01-18 14:46:43",
      "mainrole": "Admin",
      "fotos": [],
      "attachments": []
    }, {
      "id": 4,
      "name": "Cicero Krajcikoo",
      "email": "angelica12@example.com",
      "email_verified_at": 1,
      "banned": 0,
      "created_at": "2021-01-18 14:46:43",
      "mainrole": "Nessun ruolo",
      "fotos": [],
      "attachments": []
    }, {
      "id": 5,
      "name": "Jeramy Gleason PhDo",
      "email": "weston30@example.org",
      "email_verified_at": 1,
      "banned": 1,
      "created_at": "2021-01-18 14:46:43",
      "mainrole": "Operatore",
      "fotos": [],
      "attachments": []
    }, {
      "id": 6,
      "name": "Dr. Jensen Ziemann DVM",
      "email": "wtoy@example.net",
      "email_verified_at": 1,
      "banned": 1,
      "created_at": "2021-01-18 14:46:43",
      "mainrole": "Operatore",
      "fotos": [],
      "attachments": []
    }, {
      "id": 8,
      "name": "Linda Bartello",
      "email": "travon20@example.org",
      "email_verified_at": 1,
      "banned": 1,
      "created_at": "2021-01-18 14:46:43",
      "mainrole": "Operatore",
      "fotos": [],
      "attachments": []
    }, {
      "id": 10,
      "name": "Maryjane Effertz",
      "email": "hudson.tiara@example.net",
      "email_verified_at": 1,
      "banned": 1,
      "created_at": "2021-01-18 14:46:43",
      "mainrole": "Nessun ruolo",
      "fotos": [],
      "attachments": []
    }, {
      "id": 11,
      "name": "Holden Jones",
      "email": "oconner.mack@example.com",
      "email_verified_at": 1,
      "banned": 1,
      "created_at": "2021-01-18 14:46:43",
      "mainrole": "Nessun ruolo",
      "fotos": [],
      "attachments": []
    }, {
      "id": 12,
      "name": "Gunner Yundt",
      "email": "rahsaan99@example.org",
      "email_verified_at": 1,
      "banned": 0,
      "created_at": "2021-01-18 14:46:43",
      "mainrole": "Nessun ruolo",
      "fotos": [],
      "attachments": []
    }, {
      "id": 13,
      "name": "Mr. Abe Spinkao",
      "email": "charity77@example.org",
      "email_verified_at": 1,
      "banned": 0,
      "created_at": "2021-02-18 14:46:43",
      "mainrole": "Operatore",
      "fotos": [],
      "attachments": []
    }, {
      "id": 14,
      "name": "m.contento@palazzochigi.it",
      "email": "m.contento@palazzochigi.it",
      "email_verified_at": 0,
      "banned": 0,
      "created_at": "2021-02-02 14:55:51",
      "mainrole": "Operatore",
      "fotos": [],
      "attachments": []
    }, {
      "id": 15,
      "name": "ciccione",
      "email": "ciccione@it.it",
      "email_verified_at": 0,
      "banned": 0,
      "created_at": "2021-02-03 16:17:59",
      "mainrole": "Operatore",
      "fotos": [],
      "attachments": []
    }],
  },
  edit : {
    routeName: null,
    value: {
      "id": 14,
      "name": "m.contento@palazzochigi.it",
      "email": "m.contento@palazzochigi.it",
      "banned": 0,
      "mainrole": 3,
      "fotos": [],
      "attachments": [],
      "password": null,
      "password_confirmation": null
    },
    metadata: {
      "fields": {
        "id": [],
        "name": [],
        "banned": {
          "options": ["No", "S\u00ec"],
          "options_order": [0, 1]
        },
        "email": [],
        "password": [],
        "password_confirmation": [],
        "mainrole": {
          "options": {
            "-1": "Seleziona...",
            "2": "Admin",
            "5": "Login",
            "3": "Operatore",
            "1": "Superutente"
          },
          "options_order": [-1, 2, 5, 3, 1]
        }
      },
      "relations": {
        "fotos": {
          "max_items": 0,
          "min_items": 0,
          "modelRelativeName": "Foto",
          "fields": {
            "id": [],
            "nome": [],
            "descrizione": [],
            "resource": []
          },
          "orderKey": "ordine"
        },
        "attachments": {
          "max_items": 0,
          "min_items": 0,
          "modelRelativeName": "Attachment",
          "fields": {
            "id": [],
            "nome": [],
            "descrizione": [],
            "resource": []
          },
          "orderKey": "ordine"
        }
      },
    }
  },
  insert: {
    routeName: null,
    value: {
      "mainrole": -1,
      "fotos": [],
      "attachments": [],
      "id": null,
      "name": 'cicco',
      "banned": -1,
      "email": null,
      "password": null,
      "password_confirmation": null
    },
    metadata: {
      "fields": {
        "id": [],
        "name": [],
        "banned": {
          "options": ["No", "S\u00ec"],
          "options_order": [0, 1]
        },
        "email": [],
        "password": [],
        "password_confirmation": [],
        "mainrole": {
          "options": {
            "-1": "Seleziona...",
            "2": "Admin",
            "5": "Login",
            "3": "Operatore",
            "1": "Superutente"
          },
          "options_order": [-1, 2, 5, 3, 1]
        }
      },
      "relations": {
        "fotos": {
          "max_items": 0,
          "min_items": 0,
          "modelRelativeName": "Foto",
          "fields": {
            "id": [],
            "nome": [],
            "descrizione": [],
            "resource": []
          },
          "orderKey": "ordine"
        },
        "attachments": {
          "max_items": 0,
          "min_items": 0,
          "modelRelativeName": "Attachment",
          "fields": {
            "id": [],
            "nome": [],
            "descrizione": [],
            "resource": []
          },
          "orderKey": "ordine"
        }
      }
    }
  },
  view : {
    routeName: null,
    value: {
      "id": 14,
      "name": "m.contento@palazzochigi.it",
      "email": "m.contento@palazzochigi.it",
      "banned": 0,
      "mainrole": 3,
      "fotos": [],
      "attachments": [],
      "password": null,
      "password_confirmation": null
    },
    metadata: {
      "fields": {
        "id": [],
        "name": [],
        "banned": {
          "options": ["No", "S\u00ec"],
          "options_order": [0, 1]
        },
        "email": [],
        "password": [],
        "password_confirmation": [],
        "mainrole": {
          "options": {
            "-1": "Seleziona...",
            "2": "Admin",
            "5": "Login",
            "3": "Operatore",
            "1": "Superutente"
          },
          "options_order": [-1, 2, 5, 3, 1]
        }
      },
      "relations": {
        "fotos": {
          "max_items": 0,
          "min_items": 0,
          "modelRelativeName": "Foto",
          "fields": {
            "id": [],
            "nome": [],
            "descrizione": [],
            "resource": []
          },
          "orderKey": "ordine"
        },
        "attachments": {
          "max_items": 0,
          "min_items": 0,
          "modelRelativeName": "Attachment",
          "fields": {
            "id": [],
            "nome": [],
            "descrizione": [],
            "resource": []
          },
          "orderKey": "ordine"
        }
      },
    }
  },
  listEdit : {
    modelName : 'user',
    routeName : null,
    value : [{
      "id": 3,
      "name": "Amministratore",
      "email": "amministratore@amministratore.it",
      "email_verified_at": 0,
      "banned": 0,
      "created_at": "2021-01-18 14:46:43",
      "mainrole": "Admin",
      "fotos": [],
      "attachments": []
    }, {
      "id": 4,
      "name": "Cicero Krajcikoo",
      "email": "angelica12@example.com",
      "email_verified_at": 1,
      "banned": 0,
      "created_at": "2021-01-18 14:46:43",
      "mainrole": "Nessun ruolo",
      "fotos": [],
      "attachments": []
    }, {
      "id": 5,
      "name": "Jeramy Gleason PhDo",
      "email": "weston30@example.org",
      "email_verified_at": 1,
      "banned": 1,
      "created_at": "2021-01-18 14:46:43",
      "mainrole": "Operatore",
      "fotos": [],
      "attachments": []
    }, {
      "id": 6,
      "name": "Dr. Jensen Ziemann DVM",
      "email": "wtoy@example.net",
      "email_verified_at": 1,
      "banned": 1,
      "created_at": "2021-01-18 14:46:43",
      "mainrole": "Operatore",
      "fotos": [],
      "attachments": []
    }, {
      "id": 8,
      "name": "Linda Bartello",
      "email": "travon20@example.org",
      "email_verified_at": 1,
      "banned": 1,
      "created_at": "2021-01-18 14:46:43",
      "mainrole": "Operatore",
      "fotos": [],
      "attachments": []
    }, {
      "id": 10,
      "name": "Maryjane Effertz",
      "email": "hudson.tiara@example.net",
      "email_verified_at": 1,
      "banned": 1,
      "created_at": "2021-01-18 14:46:43",
      "mainrole": "Nessun ruolo",
      "fotos": [],
      "attachments": []
    }, {
      "id": 11,
      "name": "Holden Jones",
      "email": "oconner.mack@example.com",
      "email_verified_at": 1,
      "banned": 1,
      "created_at": "2021-01-18 14:46:43",
      "mainrole": "Nessun ruolo",
      "fotos": [],
      "attachments": []
    }, {
      "id": 12,
      "name": "Gunner Yundt",
      "email": "rahsaan99@example.org",
      "email_verified_at": 1,
      "banned": 0,
      "created_at": "2021-01-18 14:46:43",
      "mainrole": "Nessun ruolo",
      "fotos": [],
      "attachments": []
    }, {
      "id": 13,
      "name": "Mr. Abe Spinkao",
      "email": "charity77@example.org",
      "email_verified_at": 1,
      "banned": 0,
      "created_at": "2021-02-18 14:46:43",
      "mainrole": "Operatore",
      "fotos": [],
      "attachments": []
    }, {
      "id": 14,
      "name": "m.contento@palazzochigi.it",
      "email": "m.contento@palazzochigi.it",
      "email_verified_at": 0,
      "banned": 0,
      "created_at": "2021-02-02 14:55:51",
      "mainrole": "Operatore",
      "fotos": [],
      "attachments": []
    }, {
      "id": 15,
      "name": "ciccione",
      "email": "ciccione@it.it",
      "email_verified_at": 0,
      "banned": 0,
      "created_at": "2021-02-03 16:17:59",
      "mainrole": "Operatore",
      "fotos": [],
      "attachments": []
    }],
  }
}
