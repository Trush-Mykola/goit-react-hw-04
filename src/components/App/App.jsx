import { useEffect, useState } from "react";
import { fetchPhotos } from "../api";

import css from "./App.module.css";
import toast, { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBox from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

const App = () => {
  const [photos, setPhotos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (query === null) return;
    async function getPhotos() {
      try {
        setIsLoading(true);
        const response = await fetchPhotos(page, query);
        if (query.trim() === "") {
          toast.error("Sorry, search field cant be empty!");
          return;
        } else if (!response.total_pages) {
          toast("Sorry, we cant found photo for your request. Please try again ");
        } else {
          toast.success(`Wow, we found ${response.total} pictures`);
        }
        setPhotos(response.results);
        setTotalPages(response.total_pages);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getPhotos();
  }, [page, query]);

  const onSearchSubmit = (searchQuery) => {
    setQuery(searchQuery);
  };

  const handleLoadMore = async () => {
    try {
      setLoadMore(true);
      const nextPage = page + 1;
      const dataImages = await fetchPhotos(query, nextPage);
      setPhotos((prevPhotos) => [...prevPhotos, ...dataImages.results]);
      setPage(nextPage);
    } catch (error) {
      setIsError(true);
    } finally {
      setLoadMore(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBox onSearch={onSearchSubmit} value={query} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {photos && <ImageGallery photos={photos} onImageClick={openModal} />}
      {page < totalPages && <LoadMoreBtn onClick={handleLoadMore} />}
    </>
  );
};

export default App;
