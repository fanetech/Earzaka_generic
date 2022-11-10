import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LayoutAdmin } from './composant/admin';
import { LayoutClient } from './composant/client';
import { TraiteEvaluation, Evaluation, Categorie, Dashboard, Ticket, Liquidation, NotFound, Profile, Service, Subcategorie, User, Governed, Structure, Pointofservice, PraestareClearance, Transactionoftype, Meansofpayment, Home, History, DemandeEvaluation, DemandeClient } from './pages';
import { SignIn, SignUp, RestPassword, Otp } from './pages/account';
import { CreateProfile, CreateGoverned, CreateStructure, CreateUser, CreateCategory, CreateSubCategory, CreateService, CreatePointofservice, CreateTicket, CreateTransactionoftype, CreateMeansofpayment, CreateLiquidation, CreateEvaluation } from './pages/create';
import { EditStructure, EditUser, EditCategory, EditSubCategory, EditService, EditPointofservice, EditTicket } from './pages/edit';
import { ShowUser, ShowStructure, ShowService, ShowPointofservice, ShowTicket } from './pages/show';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./redux/rootReducer"
import methods from './constant';
import $ from 'jquery';


const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

function App() {
    
    const isAuthentification = () => {

        setTimeout(() => {
            window.location.pathname = "/";
            window.localStorage.removeItem("url_current")
        }, 43200000);

        if (methods.dataUser().nomProfilAgent.toLowerCase() == "utilisateur") {
            return(
                <>
                    <Route exact path="/" element={<LayoutClient><Home/></LayoutClient>}/>
                </>
            )
        }else if(methods.dataUser().nomProfilAgent.toLowerCase() == "gestionnaire"){
            return(
                <>
                    <Route exact path="/" element={<LayoutAdmin><Dashboard/></LayoutAdmin>}/>
                </>
            )
        }else if(methods.dataUser().nomProfilAgent.toLowerCase() == "administrateur"){
            return(
                <>
                    <Route exact path="/" element={<LayoutAdmin><Dashboard/></LayoutAdmin>}/>
                </>
            )
        }else if(methods.dataUser().nomProfilAgent.toLowerCase() == "administrateur général"){
            return(
                <>
                    <Route exact path="/" element={<LayoutAdmin><Dashboard/></LayoutAdmin>}/>
                </>
            )
        }
    }


    let idleTime = 0;
    $(document).ready(function () {
        let idleInterval = setInterval(timerIncrement, 60000); // 1 minute

        $(this).mousemove(function (e) {
            idleTime = 0;
        });
        $(this).keypress(function (e) {
            idleTime = 0;
        });
    });

    function timerIncrement() {
        idleTime = idleTime + 1;
        if (idleTime > 29) { // 30 minutes
            if(methods.getLocalStorage("user") != null){
                methods.setLocalStorage("url_current",window.location.pathname,43200001)
                window.location.pathname = "/";
                window.localStorage.removeItem("user");
            }
        }
    }


    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    {
                        (methods.getLocalStorage("user") != null) ? 
                            (
                                <>
                                    {isAuthentification()}
                                    {
                                        (methods.dataUser().nomProfilAgent.toLowerCase() == "administrateur général" || methods.dataUser().nomProfilAgent.toLowerCase() == "administrateur" || methods.dataUser().nomProfilAgent.toLowerCase() == "gestionnaire") ?
                                            (
                                                <>
                                                    {/* Utilisateur */}
                                                    <Route exact path="/utilisateur" element={<LayoutAdmin><User/></LayoutAdmin>}/>
                                                    <Route exact path="/ajouter-utilisateur" element={<LayoutAdmin><CreateUser/></LayoutAdmin>}/>
                                                    <Route exact path="/modifier-utilisateur/:id" element={<LayoutAdmin><EditUser/></LayoutAdmin>}/>
                                                    <Route exact path="/afficher-utilisateur/:id" element={<LayoutAdmin><ShowUser/></LayoutAdmin>}/>

                                                    {/* Profil */}
                                                    <Route exact path="/profil" element={<LayoutAdmin><Profile/></LayoutAdmin>}/>
                                                    <Route exact path="/ajouter-profil" element={<LayoutAdmin><CreateProfile/></LayoutAdmin>}/>

                                                    {/* Régie */}
                                                    <Route exact path="/regie" element={<LayoutAdmin><Governed/></LayoutAdmin>}/>
                                                    <Route exact path="/ajouter-regie" element={<LayoutAdmin><CreateGoverned/></LayoutAdmin>}/>
                                                    
                                                    {/* Structure */}
                                                    <Route exact path="/structure" element={<LayoutAdmin><Structure/></LayoutAdmin>}/>
                                                    <Route exact path="/ajouter-structure" element={<LayoutAdmin><CreateStructure/></LayoutAdmin>}/>
                                                    <Route exact path="/modifier-structure/:id" element={<LayoutAdmin><EditStructure/></LayoutAdmin>}/>
                                                    <Route exact path="/afficher-structure/:id" element={<LayoutAdmin><ShowStructure/></LayoutAdmin>}/>
                                                    
                                                    {/* Catégorie */}
                                                    <Route exact path="/categorie" element={<LayoutAdmin><Categorie/></LayoutAdmin>}/>
                                                    <Route exact path="/ajouter-categorie" element={<LayoutAdmin><CreateCategory/></LayoutAdmin>}/>
                                                    <Route exact path="/modifier-categorie/:id" element={<LayoutAdmin><EditCategory/></LayoutAdmin>}/>

                                                    {/* Sous Catégorie */}
                                                    <Route exact path="/souscategorie" element={<LayoutAdmin><Subcategorie/></LayoutAdmin>}/>
                                                    <Route exact path="/ajouter-souscategorie" element={<LayoutAdmin><CreateSubCategory/></LayoutAdmin>}/>
                                                    <Route exact path="/modifier-souscategorie/:id" element={<LayoutAdmin><EditSubCategory/></LayoutAdmin>}/>

                                                    {/* Service */}
                                                    <Route exact path="/service" element={<LayoutAdmin><Service/></LayoutAdmin>}/>
                                                    <Route exact path="/ajouter-service" element={<LayoutAdmin><CreateService/></LayoutAdmin>}/>
                                                    <Route exact path="/modifier-service/:id" element={<LayoutAdmin><EditService/></LayoutAdmin>}/>
                                                    <Route exact path="/afficher-service/:id" element={<LayoutAdmin><ShowService/></LayoutAdmin>}/>

                                                    {/* Point de Service */}
                                                    <Route exact path="/pointdeservice" element={<LayoutAdmin><Pointofservice/></LayoutAdmin>}/>
                                                    <Route exact path="/ajouter-pointdeservice" element={<LayoutAdmin><CreatePointofservice/></LayoutAdmin>}/>
                                                    <Route exact path="/modifier-pointdeservice/:id" element={<LayoutAdmin><EditPointofservice/></LayoutAdmin>}/>
                                                    <Route exact path="/afficher-pointdeservice/:id" element={<LayoutAdmin><ShowPointofservice/></LayoutAdmin>}/>

                                                    {/* Guichet */}
                                                    <Route exact path="/guichet" element={<LayoutAdmin><Ticket/></LayoutAdmin>}/>
                                                    <Route exact path="/ajouter-guichet" element={<LayoutAdmin><CreateTicket/></LayoutAdmin>}/>
                                                    <Route exact path="/modifier-guichet/:id" element={<LayoutAdmin><EditTicket/></LayoutAdmin>}/>
                                                    <Route exact path="/afficher-guichet/:id" element={<LayoutAdmin><ShowTicket/></LayoutAdmin>}/>

                                                    {/* Type de transaction */}
                                                    <Route exact path="/typedetransaction" element={<LayoutAdmin><Transactionoftype/></LayoutAdmin>}/>
                                                    <Route exact path="/ajouter-typedetransaction" element={<LayoutAdmin><CreateTransactionoftype/></LayoutAdmin>}/>
                                                    
                                                    {/* Moyen de paiement */}
                                                    <Route exact path="/moyendepaiement" element={<LayoutAdmin><Meansofpayment/></LayoutAdmin>}/>
                                                    <Route exact path="/ajouter-moyendepaiement" element={<LayoutAdmin><CreateMeansofpayment/></LayoutAdmin>}/>

                                                    {/* Liquidation */}
                                                    <Route exact path="/liquidation" element={<LayoutAdmin><Liquidation/></LayoutAdmin>}/>
                                                    <Route exact path="/ajouter-liquidation" element={<LayoutAdmin><CreateLiquidation/></LayoutAdmin>}/>
                                                    
                                                    {/* Demande d'evaluation */}
                                                    <Route exact path="/demandeevaluation" element={<LayoutAdmin><DemandeEvaluation/></LayoutAdmin>}/>

                                                    {/* Demande d'evaluation */}
                                                    <Route exact path="/evaluation" element={<LayoutAdmin><Evaluation/></LayoutAdmin>}/>
                                                    <Route exact path="/ajouter-evaluation/:id" element={<LayoutAdmin><CreateEvaluation/></LayoutAdmin>}/>
                                                </>
                                            ):""
                                    }

                                    {   
                                        (methods.dataUser().nomProfilAgent.toLowerCase() == "utilisateur") ?
                                            (
                                                <>
                                                    <Route exact path="/historique" element={<LayoutClient><History/></LayoutClient>}/>
                                                    <Route exact path="/effectuerliquidation" element={<LayoutClient><PraestareClearance/></LayoutClient>}/>
                                                    <Route exact path="/effectuerdemandeevaluation" element={<LayoutClient><DemandeClient/></LayoutClient>}/>
                                                    <Route exact path="/traitedemandeevaluation/:id" element={<LayoutClient><TraiteEvaluation/></LayoutClient>}/>
                                                </>
                                            ):""
                                    }
                                    <Route exact path="/otp" element={<Otp/>}/>
                                </>
                            ):(
                                <>
                                    <Route exact path="/" element={<LayoutClient><Home/></LayoutClient>}/>
                                    
                                    {/*Authentification*/}
                                    <Route exact path="/connection" element={<SignIn/>}/>
                                    {/* <Route exact path="/inscription" element={<SignUp/>}/>
                                    <Route exact path="/restauration-du-mot-de-passe" element={<RestPassword/>}/> */}
                                </>
                            )
                    }
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
