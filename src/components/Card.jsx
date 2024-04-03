// ---------- CARD Component ----------

// Props infosArray (either characters or comics array)
const Card = ({ infosArray }) => {
  // Size img for Url aspect ratio
  const portraitMedium = `portrait_medium`; // 100x150px ok
  const portraitFantastic = `portrait_fantastic`; // 168x252px
  // Size img for Url standard square
  const standardSmall = `standard_small`; // 65x45px petit petit
  const standardLarge = `standard_large`; // 140x140px BOF NON

  return (
    <>
      {infosArray.map((element) => {
        return (
          <article key={element._id} style={{ width: `200px` }}>
            <img
              src={`${element.thumbnail.path}/${portraitFantastic}.${element.thumbnail.extension}`}
              alt={`photo de ${element.name}`}
            />
            <h2>{element.name}</h2>
            <p>{element.description}</p>
          </article>
        );
      })}
    </>
  );
};

export default Card;
