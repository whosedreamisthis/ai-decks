import React from 'react';

interface Props {
    params: Promise<{deckId: string}>
}

const DeckPage = async ({params}:Props) => {
    const {deckId} = await params;
    return (
        <div>
            {deckId}
        </div>
    );
};

export default DeckPage;