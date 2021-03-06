import { useEffect, useState } from "react";

import axios from '../helpers/axios';
import './ImageList.css';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';
import List from '@mui/material/List';




const ImagesList = () => {

    const [imagelist, setImageList] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [selectedImageData, setSelectedImageData] = useState(null)
    const [isDialogOpen, setDialogOpen] = useState(false)


    useEffect(() => {
        axios.get('/v2/list', {
            params: {
                page, limit: 10
            }
        }).then((data) => {
            setImageList(prevImages => [...prevImages, ...data])
            setLoading(false)



        })
    }, [page]);

    const handleClick = () => {
        setPage(page + 1)
    }

    const handleDialogOpen = (image) =>()=> {
        setSelectedImageData(image)
        setDialogOpen(true) 

        
    }

    const handleDialogClose = () => {
        setDialogOpen(false)
        setSelectedImageData(null)
    
    }

    if (isLoading) {
        return <p>Loading...</p>
    }
    return (
        <>
            <div className="container">
                <ImageList sx={{ width: 700 }}>
                    {imagelist.map((image) => (
                        <ImageListItem key={image.id} onClick={handleDialogOpen(image)}>
                            
                            <img src={image.download_url} alt={image} />
                        </ImageListItem>
                    ))}
                </ImageList>

                <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                    <DialogTitle><h1>Info image</h1></DialogTitle>
                    <List>
                   <p>Author: {selectedImageData?.author}</p>
                   <p>Width: {selectedImageData?.width}</p>
                   <p>Height: {selectedImageData?.height}</p>
                   </List>
                   
                </Dialog>


                <Button variant="contained" size="large" onClick={handleClick}>Show more</Button>
            </div>

        </>
    );

};



export default ImagesList;
