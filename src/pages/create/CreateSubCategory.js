import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createSubcategory } from '../../redux/subcategory/subcategoryAction';
import { getAllCategorys} from '../../redux/category/categoryAction';
import methods from '../../constant';
import Swal from 'sweetalert2';


const INPUT_TIMEOUT = 250;

const CreateSubCategory = ({ createSubcategory, apiLoadingCategories, getAllCategorys, apiDataCategories }) => {

    useEffect(() => {
        if (!apiLoadingCategories) {
            getAllCategorys();
        }
    })

    const material_icons = methods.icones;
    const [material_Resultat, setMaterial_Resultat] = useState([]);
    const [subcategory, setSubcategory] = useState({ 'categoryId': '', 'labels': ['',''], 'iconName': '' });
    const [seachEl,setSeachEl] = useState('');
    const [afficheIcon,setAfficheIcon] = useState(false);

    const getPredictions = (value) => {
        return methods.icones.filter(item => item.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }

    const myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        setSubcategory({
            ...subcategory,
            [nam]: val
        });
    }

    const seacherEffect = (event) => {
        let val = event.target.value;
        setSeachEl(val);
        if (val.length > 0) {
            setTimeout(() => {
                setMaterial_Resultat(getPredictions(val));
            }, INPUT_TIMEOUT);
        } else {
            setMaterial_Resultat([]);
        }
    }

    const myChangeHandler0 = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        setSubcategory({
            ...subcategory,
            'labels': [( nam=='labels[0]' ) ? val:subcategory.labels[0], ( nam=='labels[1]' ) ? val:subcategory.labels[1]]
        });
    }

    const CreateSubCategoryConfrime = () => {
        if(subcategory.categoryId.length < 1){
            document.getElementById("erroridCategory").innerText = "Veuillez choisir une r??gie."
        }else{
            document.getElementById("erroridCategory").innerText = "";
            if(subcategory.labels[0].length < 2){
                document.getElementById("errorlibelleFr").innerText = "Le nombre de caract??re minimum est 2.";
            }else {
                document.getElementById("errorlibelleFr").innerText = "";
                if(subcategory.labels[1].length < 2){
                    document.getElementById("errorlibelleAg").innerText = "Le nombre de caract??re minimum est 2.";
                }else {
                    document.getElementById("errorlibelleAg").innerText = "";
                    if(subcategory.iconName.length < 2){
                        document.getElementById("erroriconeIll").innerText = "Le nombre de caract??re minimum est 2.";
                    }else {
                        document.getElementById("erroriconeIll").innerText = "";
                        if (createSubcategory(subcategory)) {
                            Swal.fire({
                                text: "Une nouvelle sous cat??gorie a ??t?? ajouter.",
                                icon: "success",
                                buttonsStyling: false,
                                confirmButtonText: "OK",
                                customClass: {
                                    confirmButton: "btn btn-success"
                                }
                            }).then(function (result) {
                                if (result.isConfirmed) {
                                    window.location.pathname = "/souscategorie";
                                }
                            });
                        }
                    }
                }
            }
        }
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Sous Cat??gorie</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Ajouter une nouvelle sous cat??gorie</li>
            </ol>
            <div className="row justify-content-center">
                <div className="card mb-4 mt-4 w-75">
                    <div className="card-body">
                        { apiLoadingCategories && Object.keys(apiDataCategories).length > 0 ?
                            (
                                <>
                                    <div className="row mb-2">
                                        <div className="col-sm-12 col-md-4 mb-2">
                                            <div className="form-group">
                                                <label>Cat??gorie <span className="text-danger">*</span> :</label>
                                                <select className="form-control mt-2" name="categoryId" onChange={(event) => myChangeHandler(event)}>
                                                    <option value={''}>Choisir une cat??gorie...</option>
                                                    {
                                                        apiDataCategories.map((data) => {
                                                            return(<option value={data.id} key={data.id}>{data.labels[0]}</option>)
                                                        })
                                                    }
                                                </select>
                                                <small id="erroridCategory" className="text-danger"></small>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-4 mb-2">
                                            <div className="form-group">
                                                <label>Libelle en Fran??ais <span className="text-danger">*</span> :</label>
                                                <input type="text" className="form-control mt-2" name="labels[0]" value={subcategory.labels[0]} required onChange={(event) => myChangeHandler0(event)} />
                                                <small id="errorlibelleFr" className="text-danger"></small>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-4 mb-2">
                                            <div className="form-group">
                                                <label>Libelle en Anglais <span className="text-danger">*</span> :</label>
                                                <input type="text" className="form-control mt-2" name="labels[1]" value={subcategory.labels[1]} required onChange={(event) => myChangeHandler0(event)} />
                                                <small id="errorlibelleAg" className="text-danger"></small>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        afficheIcon ?
                                        (
                                            <div>
                                                <div className="d-flex justify-content-between align-content-center align-items-center mb-4">
                                                    <h5>Choisir une ic??ne illustratoire</h5>
                                                    <div className="form-group">
                                                        <input type="text" className="form-control mt-2" name="seacher" placeholder="Recherch?? une ic??ne" value={seachEl} onChange={(event) => seacherEffect(event)} />
                                                    </div>
                                                    <button type="button" onClick={() => setAfficheIcon(false)} className="btn btn-close"></button>
                                                </div>
                                                <div className="row mb-2 overflow-auto h-25-icone py-2">
                                                    {
                                                        seachEl.length > 1 ? 
                                                        (
                                                            material_Resultat.map((data,index) => {
                                                                return (
                                                                    <div key={index} className="col-sm-2 col-md-2 mb-2 text-center">
                                                                        <span className="material-icons" onClick={() =>(setSubcategory({...subcategory,'iconName': data}),setAfficheIcon(false))} style={{cursor: "pointer"}}>{data}</span>
                                                                    </div>
                                                                )
                                                            })
                                                        ):
                                                        (
                                                            material_icons.map((data,index) => {
                                                                return (
                                                                    <div key={index} className="col-sm-2 col-md-2 mb-2 text-center">
                                                                        <span className="material-icons" onClick={() =>(setSubcategory({...subcategory,'iconName': data}),setAfficheIcon(false))} style={{cursor: "pointer"}}>{data}</span>
                                                                    </div>
                                                                )
                                                            })
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        ):""
                                    }
                                    <div className="row mb-2">
                                        <div className="col-sm-6 col-md-4 mb-2">
                                            <div className="form-group">
                                                <label>Ic??ne Illustration <span className="text-danger">*</span> :</label>
                                                <div className="row" style={{"--bs-gutter-x": "none"}}>
                                                    <div className="col-sm-10 col-md-10">
                                                        <input type="text" onClick={() => setAfficheIcon(true)} className="form-control mt-2" name="iconName" value={subcategory.iconName} required onChange={(event) => myChangeHandler(event)} />
                                                    </div>
                                                    <div className="col-sm-2 col-md-2 text-center">
                                                        <span className="material-icons mt-2">{subcategory.iconName}</span>
                                                    </div>
                                                </div>
                                                <small id="erroriconeIll" className="text-danger"></small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="d-flex justify-content-center mt-2 p-2">
                                            <Link type="button" className="btn btn-secondary me-1" data-toggle="button" to="/souscategorie">Annuler</Link>
                                            <button type="button" className="btn text-white" style={{ background: "#033d7c" }} onClick={() => CreateSubCategoryConfrime() } data-toggle="button">Confirmer</button>
                                        </div>
                                    </div>
                                </>
                            ):(<p></p>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        apiLoadingCategories: state.categoryReducer.loadingCategory,
        apiDataCategories: state.categoryReducer.categories,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createSubcategory: (subcategory) => dispatch(createSubcategory(subcategory)),
        getAllCategorys: ()   => dispatch(getAllCategorys()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateSubCategory);