// ---------- CARD Component ----------

// Props element (either character or comic)
const Card = ({ element }) => {
  // Size img for Url aspect ratio
  const portraitMedium = `portrait_medium`; // 100x150px ok
  const portraitFantastic = `portrait_fantastic`; // 168x252px
  // Size img for Url standard square
  const standardSmall = `standard_small`; // 65x45px petit petit
  const standardLarge = `standard_large`; // 140x140px BOF NON

  return (
    <article key={element._id} style={{ width: `200px` }}>
      <img
        src={`${element.thumbnail.path}/${portraitFantastic}.${element.thumbnail.extension}`}
        alt={
          element.title
            ? `photo de ${element.title}`
            : `photo de ${element.name}`
        }
      />
      <h2>{element.title ? element.title : element.name}</h2>
      <p>{element.description}</p>
    </article>
  );
};

// Export component
export default Card;
