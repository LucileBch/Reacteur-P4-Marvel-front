// ---------- CARD Component ----------

// Props element (either character or comic)
const Card = ({ element }) => {
  // Size img for Url aspect ratio
  const portraitFantastic = `portrait_fantastic`; // 168x252px

  return (
    <>
      <img
        src={`${element.thumbnail.path}/${portraitFantastic}.${element.thumbnail.extension}`}
        alt={
          element.title
            ? `photo de ${element.title}`
            : `photo de ${element.name}`
        }
        className="card__image"
      />

      <div className="card__content">
        <h2>{element.title ? element.title : element.name}</h2>
        <p>{element.description}</p>
      </div>
    </>
  );
};

// Export component
export default Card;
