import {
    Firestore,
    collection,
    getDocs,
    onSnapshot,
    doc,
    getDoc,
    addDoc,
} from "firebase/firestore";

export class ProductDataService {
    constructor(private readonly firestore: Firestore) {}

    async getProduct(id: string) {
        const { data } = await getDoc(doc(this.firestore, "product", id));
        return data();
    }

    async getProductReviews(id: string) {
        const { docs } = await getDocs(
            collection(this.firestore, "product", id, "reviews")
        );
        return docs.map(docs => docs.data());
    }

    async sendReview(
        id: string,
        displayName: string,
        message: string,
        star: number,
        date: Date
    ) {
        const col = collection(this.firestore, "product", id, "reviews");
        const doc = await addDoc(col, { displayName, message, star, date });
        return doc;
    }
}
