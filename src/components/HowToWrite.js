import React from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';

const HowToWrite = () => {
    return (
        <Container maxWidth="md">
            <Box my={4}>
                <Paper elevation={3}>
                    <Box p={3}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            How to Write
                        </Typography>
                        <Typography paragraph>
                            Writing well involves planning, drafting, revising, and editing. Follow these steps to improve your writing skills:
                        </Typography>
                        <Typography variant="h6" component="h2">
                            1. Plan Your Content
                        </Typography>
                        <Typography paragraph>
                            Before you start writing, decide on the purpose of your content and your target audience. Outline the main points you want to cover.
                        </Typography>
                        <Typography variant="h6" component="h2">
                            2. Draft Your Text
                        </Typography>
                        <Typography paragraph>
                            Write a first draft without worrying too much about grammar or style. Focus on getting your ideas down on paper.
                        </Typography>
                        <Typography variant="h6" component="h2">
                            3. Revise for Clarity
                        </Typography>
                        <Typography paragraph>
                            Re-read your draft and make changes to improve the flow and clarity of your writing. Ensure that your content is coherent and logically structured.
                        </Typography>
                        <Typography variant="h6" component="h2">
                            4. Edit for Grammar and Style
                        </Typography>
                        <Typography paragraph>
                            Check for grammar, punctuation, and spelling errors. Also, refine your writing style to make it more engaging and professional.
                        </Typography>
                        <Typography variant="h6" component="h2">
                            5. Get Feedback
                        </Typography>
                        <Typography paragraph>
                            Share your writing with others and ask for constructive feedback. Use their suggestions to make further improvements.
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default HowToWrite;
