import React from 'react';

interface Props {
    params: Promise<{deckId:string;cardId:string}>
}

const CardPage = async ({params}:Props) => {
    const {deckId, cardId} = await params;

    return (
        <div>
            {deckId} / {cardId}
        </div>
    );
};

export default CardPage;