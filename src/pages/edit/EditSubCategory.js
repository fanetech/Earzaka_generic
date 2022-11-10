import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateSubcategory } from '../../redux/subcategory/subcategoryAction';
import { getAllCategorys} from '../../redux/category/categoryAction';
import Swal from 'sweetalert2';
import { getAllSubcategorys } from '../../redux/subcategory/subcategoryAction';
import methods from '../../constant';

const INPUT_TIMEOUT = 250;

const EditSubCategory = ({ getAllSubcategorys, apiLoadingSubcategories, apiDataSubcategories, updateSubcategory, apiLoadingCategories, getAllCategorys, apiDataCategories }) => {

    let { id } = useParams();

    const [subcategory, setSubcategory ] = useState({ 'categoryId': '', 'labels': ['',''], 'iconName': '' });

    const [afficheIcon,setAfficheIcon] = useState(false);

    useEffect(() => {
        if (!apiLoadingCategories) {
            getAllCategorys();
        }

        if (!apiLoadingSubcategories) {
            getAllSubcategorys();
        }

        if (apiLoadingSubcategories) {
            let dataUpdate = apiDataSubcategories.filter(data => data.id == id);
            if(dataUpdate.length == 1){
                setSubcategory(dataUpdate[0])
            }
        }
    },[]);


    const material_icons = methods.icones;
    const [material_Resultat, setMaterial_Resultat] = useState([]);
    const [seachEl,setSeachEl] = useState('');

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

    const UpdateSubCategoryConfrime = () => {
        if(subcategory.categoryId.length < 1){
            document.getElementById("erroridCategory").innerText = "Veuillez choisir une régie."
        }else{
            document.getElementById("erroridCategory").innerText = "";
            if(subcategory.labels[0].length < 2){
                document.getElementById("errorlibelleFr").innerText = "Le nombre de caractère minimum est 2.";
            }else {
                document.getElementById("errorlibelleFr").innerText = "";
                if(subcategory.labels[1].length < 2){
                    document.getElementById("errorlibelleAg").innerText = "Le nombre de caractère minimum est 2.";
                }else {
                    document.getElementById("errorlibelleAg").innerText = "";
                    if(subcategory.iconName.length < 2){
                        document.getElementById("erroriconeIll").innerText = "Le nombre de caractère minimum est 2.";
                    }else {
                        document.getElementById("erroriconeIll").innerText = "";
                        if (updateSubcategory(subcategory.id,subcategory)) {
                            Swal.fire({
                                text: "La sous catégorie a étè modifier.",
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
            <h1 className="mt-4">Sous Catégorie</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Modifier la sous catégorie</li>
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
                                                <label>Catégorie <span className="text-danger">*</span> :</label>
                                                <select defaultValue={apiDataCategories.filter(data => data.id == subcategory.categoryId)[0].id} className="form-control mt-2" name="categoryId" onChange={(event) => myChangeHandler(event)}>
                                                    <option value={''}>Choisir une catégorie...</option>
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
                                                <label>Libelle en Français <span className="text-danger">*</span> :</label>
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
                                                    <h5>Choisir une icône illustratoire</h5>
                                                    <div className="form-group">
                                                        <input type="text" className="form-control mt-2" name="seacher" placeholder="Recherché une icône" value={seachEl} onChange={(event) => seacherEffect(event)} />
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
                                                <label>Icône Illustration <span className="text-danger">*</span> :</label>
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
                                            <button type="button" className="btn text-white" style={{ background: "#033d7c" }} onClick={() => UpdateSubCategoryConfrime() } data-toggle="button">Confirmer</button>
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
        apiLoadingSubcategories: state.subcategoryReducer.loadingSubcategory,
        apiDataSubcategories: state.subcategoryReducer.subcategories,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateSubcategory: (id,subcategory) => dispatch(updateSubcategory(id,subcategory)),
        getAllCategorys: ()   => dispatch(getAllCategorys()),
        getAllSubcategorys: ()   => dispatch(getAllSubcategorys())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditSubCategory);