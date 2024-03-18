import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { db, storage } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Form, Container, Row, Col, FormGroup } from 'reactstrap';

const AddProduct = () => {
    const [enterTitle, setEnterTitle] = useState('');
    const [enterShortDesc, setEnterShortDesc] = useState('');
    const [enterDescription, setEnterDescription] = useState('');
    const [enterCategory, setEnterCategory] = useState('');
    const [enterPrice, setEnterPrice] = useState('');
    const [enterProductImg, setEnterProductImg] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const addProduct = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const docRef = await collection(db, 'spleasss');
            const storageRef = ref(storage, `/spleaseImages/${Date.now()}`);
            const uploadTask = uploadBytesResumable(storageRef, enterProductImg);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Progress monitoring if needed
                },
                (error) => {
                    toast.error('Error uploading image: ' + error.message);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await addDoc(docRef, {
                            title: enterTitle,
                            shortDesc: enterShortDesc,
                            description: enterDescription,
                            category: enterCategory,
                            price: enterPrice,
                            imgUrl: downloadURL,
                        });
                        setLoading(false);
                        toast.success('Product successfully added');
                        navigate('/dashboard/all-products');
                    });
                }
            );
        } catch (err) {
            setLoading(false);
            toast.error('Product not added: ' + err.message);
        }
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12">
                        {loading ? (
                            <h4 className="py-">Loading...........</h4>
                        ) : (
                            <>
                                <h4>Add Product</h4>
                                <Form onSubmit={addProduct}>
                                    <FormGroup className="form__group">
                                        <span>Product title</span>
                                        <input type="text" placeholder="products" value={enterTitle} onChange={(e) => setEnterTitle(e.target.value)} required />
                                    </FormGroup>
                                    <FormGroup className="form__group">
                                        <span>Short Description</span>
                                        <input type="text" placeholder="lorem....." value={enterShortDesc} onChange={(e) => setEnterShortDesc(e.target.value)} required />
                                    </FormGroup>
                                    <FormGroup className="form__group">
                                        <span>Description</span>
                                        <input type="text" placeholder="Description....." value={enterDescription} onChange={(e) => setEnterDescription(e.target.value)} required />
                                    </FormGroup>
                                    <div className="d-flex align-items-center justify-content-between gap-5">
                                        <FormGroup className="form__group w-50">
                                            <span>Price</span>
                                            <input type="text" placeholder="100" value={enterPrice} onChange={(e) => setEnterPrice(e.target.value)} required />
                                        </FormGroup>
                                        <FormGroup className="form__group w-50 ">
                                            <span>Category</span>
                                            <select className="w-100 p-2" value={enterCategory} onChange={(e) => setEnterCategory(e.target.value)}>
                                                <option value="desi">Desi</option>
                                                <option value="plantation">Plantation</option>
                                                <option value="exotic">Exotic</option>
                                                <option value="forestry">Forestry</option>
                                                <option value="spices">Spices</option>
                                            </select>
                                        </FormGroup>
                                    </div>
                                    <div>
                                        <FormGroup className="form__group">
                                            <span>Product Image</span>
                                            <input type="file" onChange={(e) => setEnterProductImg(e.target.files[0])} required />
                                        </FormGroup>
                                    </div>
                                    <button className="buy__btn" type="submit">
                                        Add product
                                    </button>
                                </Form>
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default AddProduct;
