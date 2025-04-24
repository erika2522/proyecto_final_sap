sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], (Controller, JSONModel, MessageToast) => {
    "use strict";

    return Controller.extend("proyectofinal.proyectofinal.controller.main", {

        onInit() {
            // Crear y asignar modelo JSON para los usuarios
            const oModel = new JSONModel({
                users: []
            });
            this.getView().setModel(oModel);
        },

        onSavePress() {
            const oView = this.getView();
            const oModel = oView.getModel();
            const aUsers = oModel.getProperty("/users");

            const oUser = {
                id: oView.byId("idInput").getValue(),
                typeDocument: oView.byId("typeDocumentSelect").getSelectedKey(),
                numberDocument: oView.byId("numberDocumentInput").getValue(),
                firstName: oView.byId("firstNameInput").getValue(),
                lastName: oView.byId("lastNameInput").getValue(),
                birthDate: oView.byId("birthDatePicker").getValue(),
                placeBirth: oView.byId("placeBirthInput").getValue(),
                nationality: oView.byId("nationalityInput").getValue(),
                genre: oView.byId("genreSelect").getSelectedKey(),
                civilStatus: oView.byId("civilStatusSelect").getSelectedKey(),
                country: oView.byId("countryInput").getValue(),
                province: oView.byId("provinceInput").getValue(),
                region: oView.byId("regionInput").getValue(),
                address: oView.byId("addressInput").getValue(),
                postalCode: oView.byId("postalCodeInput").getValue(),
                phoneNumber: oView.byId("phoneInput").getValue(),
                email: oView.byId("emailInput").getValue()
            };

            // Validar que todos los campos estén completos
            for (const key in oUser) {
                if (!oUser[key]) {
                    MessageToast.show("Por favor completa todos los campos obligatorios.");
                    return;
                }
            }

            // Agregar usuario al modelo
            aUsers.push(oUser);
            oModel.setProperty("/users", aUsers);
            MessageToast.show("Usuario guardado con éxito.");

            this._clearForm();
        },

        onClearPress() {
            this._clearForm();
            MessageToast.show("Formulario limpiado.");
        },
        onExportPress() {
            const oView = this.getView();
            const oModel = oView.getModel();
            const aUsers = oModel.getProperty("/users");
        
            // Convertir los datos a formato JSON
            const sJSON = JSON.stringify(aUsers, null, 2);  // El `null, 2` es para dar formato bonito
        
            // Crear un archivo Blob de tipo JSON
            const oBlob = new Blob([sJSON], { type: "application/json" });
        
            // Crear un enlace para la descarga
            const oLink = document.createElement("a");
            oLink.href = URL.createObjectURL(oBlob);
            oLink.download = "usuarios.json";  // Nombre del archivo JSON
            oLink.click();  // Iniciar la descarga
        },
        
        _clearForm() {
            const oView = this.getView();

            const aIds = [
                "idInput", "typeDocumentSelect", "numberDocumentInput",
                "firstNameInput", "lastNameInput", "birthDatePicker",
                "placeBirthInput", "nationalityInput", "genreSelect",
                "civilStatusSelect", "countryInput", "provinceInput",
                "regionInput", "addressInput", "postalCodeInput",
                "phoneInput", "emailInput"
            ];

            aIds.forEach(id => {
                const oControl = oView.byId(id);
                if (oControl) {
                    if (oControl.setValue) {
                        oControl.setValue("");
                    } else if (oControl.setSelectedKey) {
                        oControl.setSelectedKey("");
                    }
                }
            });
        }
    });
});
