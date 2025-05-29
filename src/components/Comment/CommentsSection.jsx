import { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';


const CommentsSection = () => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'Nguyễn Văn A',
      avatar: '/api/placeholder/40/40',
      time: '2 giờ trước',
      rating: 4.5,
      content: 'Phim hay quá! Cảm ơn admin đã share',
      likes: 15,
      dislikes: 2
    },
    {
      id: 2,
      user: 'Trần Thị B',
      avatar: '/api/placeholder/40/40',
      time: '5 giờ trước',
      rating: 4.0,
      content: 'Kịch bản tốt, diễn xuất ổn. Đáng xem!',
      likes: 8,
      dislikes: 1
    }
  ]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        user: 'Bạn',
        avatar: '/api/placeholder/40/40',
        time: 'Vừa xong',
        rating: 5,
        content: newComment,
        likes: 0,
        dislikes: 0
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-4">
          Comment ({comments.length})
        </h3>
        
        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className="mb-6">
          <div className="flex gap-4">
            <img 
              src="/api/placeholder/40/40" 
              alt="Your avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Viết bình luận của bạn..."
                className="w-full p-3 bg-gray-800 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                rows="3"
              />
              <button
                type="submit"
                className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
        
        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 p-4 bg-gray-800 rounded-lg">
              <img 
                src={comment.avatar} 
                alt={comment.user}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white font-medium">{comment.user}</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(comment.rating) 
                            ? 'text-yellow-500 fill-current' 
                            : 'text-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm">{comment.time}</span>
                </div>
                <p className="text-gray-300 mb-3">{comment.content}</p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-gray-400 hover:text-green-500 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    {comment.likes}
                  </button>
                  <button className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors">
                    <ThumbsDown className="w-4 h-4" />
                    {comment.dislikes}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CommentsSection;