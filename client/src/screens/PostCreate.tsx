import React, {useState} from 'react';
import axios from 'axios';
import AlleSysMicroPost from "../apis/AlleSysMicroPost";

const PostCreate = () => {
    const [title, setTitle] = useState('');
    // Correct Typing, must fix later
    // React.FormEvent<HTMLInputElement

    const onSubmit = async(event: any) => {
         event.preventDefault() ;

         await AlleSysMicroPost.post('/posts', {
            title
         });

         setTitle('');
    };

    return(
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="form-control"
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default PostCreate
