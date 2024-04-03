import { useEffect, useState } from "react";
import { fetchPhotos } from "../api";

import css from "./App.module.css";
import toast, { Toaster } from "react-hot-toast";
import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBox from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

const App = () => {
  const [photos, setPhotos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    if (query === null) return;
    async function getPhotos() {
      try {
        setIsLoading(true);
        const response = await fetchPhotos(page, query);
        if (!response.total_pages) {
          toast("Sorry, we cant found photo for your request. Please try again ");
        } else {
          if (searchPerformed) {
            toast.success(`Wow, we found ${response.total} pictures`);
          }
        }
        setPhotos((prevPhotos) => (page === 1 ? response.results : [...prevPhotos, ...response.results]));
        setTotalPages(response.total_pages);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getPhotos();
  }, [page, query, searchPerformed]);

  const onSearchSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setSearchPerformed(true);
  };

  const handleLoadMore = async () => {
    try {
      setLoadMore(true);
      const nextPage = page + 1;
      setPage(nextPage);
    } catch (error) {
      setIsError(true);
    } finally {
      setLoadMore(false);
    }
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBox onSearch={onSearchSubmit} value={query} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {photos && <ImageGallery photos={photos} onImageClick={openModal} />}
      {page < totalPages && <LoadMoreBtn onClick={handleLoadMore} />}
      <ImageModal photo={selectedPhoto} isOpen={isModalOpen} onRequestClose={closeModal} />
    </>
  );
};

export default App;
